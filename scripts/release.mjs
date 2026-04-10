#!/usr/bin/env node
/**
 * release.mjs — zero-dependency release script
 *
 * What it does:
 *  1. Reads conventional commits since the last git tag
 *  2. Suggests a semver bump (major / minor / patch) from commit types
 *  3. Prompts you to confirm or override the version
 *  4. Prepends a new entry to CHANGELOG.md
 *  5. Bumps version in package.json
 *  6. git add → git commit → git tag
 */

import { execSync } from 'child_process';
import { createInterface } from 'readline';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ─── Helpers ────────────────────────────────────────────────────────────────

function git(cmd) {
  return execSync(`git ${cmd}`, { cwd: ROOT }).toString().trim();
}

function prompt(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

function bumpVersion(current, type) {
  const [major, minor, patch] = current
    .replace(/^v/, '')
    .split('.')
    .map(Number);
  if (type === 'major') return `${major + 1}.0.0`;
  if (type === 'minor') return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}

// ─── Commit type config ──────────────────────────────────────────────────────

const TYPE_CONFIG = {
  feat: { label: 'Features', bump: 'minor' },
  fix: { label: 'Bug Fixes', bump: 'patch' },
  perf: { label: 'Performance', bump: 'patch' },
  refactor: { label: 'Refactors', bump: 'patch' },
  style: { label: 'Styles', bump: 'patch' },
  docs: { label: 'Documentation', bump: 'patch' },
  chore: { label: 'Chores', bump: 'patch' },
  build: { label: 'Build System', bump: 'patch' },
  ci: { label: 'CI', bump: 'patch' },
  test: { label: 'Tests', bump: 'patch' },
};

const BUMP_PRIORITY = { major: 3, minor: 2, patch: 1 };

// ─── Parse commits ───────────────────────────────────────────────────────────

function getLastTag() {
  try {
    return git('describe --tags --abbrev=0');
  } catch {
    return null;
  }
}

function getCommitsSince(tag) {
  const range = tag ? `${tag}..HEAD` : 'HEAD';
  const raw = git(`log ${range} --pretty=format:"%s|||%h"`);
  if (!raw) return [];
  return raw.split('\n').map((line) => {
    const [subject, hash] = line.split('|||');
    return { subject, hash };
  });
}

function parseCommit(subject) {
  // Matches: type(scope)!: description   OR   type!: description   OR   type: description
  const match = subject.match(/^(\w+)(\([^)]+\))?(!)?\s*:\s*(.+)$/);
  if (!match) return null;
  const [, type, scope, breaking, description] = match;
  return {
    type: type.toLowerCase(),
    scope: scope ? scope.slice(1, -1) : null,
    breaking: !!breaking,
    description,
  };
}

// ─── Main ────────────────────────────────────────────────────────────────────

const rl = createInterface({ input: process.stdin, output: process.stdout });

try {
  const lastTag = getLastTag();
  const rawCommits = getCommitsSince(lastTag);

  console.log(`\n📦  Last tag: ${lastTag ?? '(none)'}`);
  console.log(`📝  Commits since: ${rawCommits.length}\n`);

  if (rawCommits.length === 0) {
    console.log('No commits found since last tag. Nothing to release.');
    process.exit(0);
  }

  // Parse + group
  const grouped = {};
  let suggestedBump = 'patch';

  for (const { subject, hash } of rawCommits) {
    const parsed = parseCommit(subject);
    if (!parsed) {
      grouped['other'] = grouped['other'] ?? [];
      grouped['other'].push({ description: subject, hash });
      continue;
    }

    const { type, breaking, description } = parsed;
    if (breaking || type === 'breaking') {
      suggestedBump = 'major';
    } else {
      const typeBump = TYPE_CONFIG[type]?.bump ?? 'patch';
      if (BUMP_PRIORITY[typeBump] > BUMP_PRIORITY[suggestedBump]) {
        suggestedBump = typeBump;
      }
    }

    const key = type in TYPE_CONFIG ? type : 'other';
    grouped[key] = grouped[key] ?? [];
    grouped[key].push({ description, hash });
  }

  // Read current version
  const pkgPath = resolve(ROOT, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  const currentVersion = pkg.version ?? '0.0.0';
  const suggestedVersion = bumpVersion(currentVersion, suggestedBump);

  console.log(`Current version : v${currentVersion}`);
  console.log(`Suggested bump  : ${suggestedBump} → v${suggestedVersion}\n`);

  const inputVersion = await prompt(
    rl,
    `Enter version (leave blank to use ${suggestedVersion}): `,
  );
  const newVersion = inputVersion.trim() || suggestedVersion;

  if (!/^\d+\.\d+\.\d+$/.test(newVersion)) {
    console.error('Invalid version format. Use semver: X.Y.Z');
    process.exit(1);
  }

  const today = new Date().toISOString().slice(0, 10);

  // Build changelog entry
  const lines = [`## [${newVersion}] — ${today}`, ''];

  for (const [type, commits] of Object.entries(grouped)) {
    const label = TYPE_CONFIG[type]?.label ?? 'Other';
    lines.push(`### ${label}`);
    for (const { description, hash } of commits) {
      lines.push(`- ${description} (\`${hash}\`)`);
    }
    lines.push('');
  }

  const newEntry = lines.join('\n');

  // Prepend to CHANGELOG.md
  const changelogPath = resolve(ROOT, 'CHANGELOG.md');
  const existing = readFileSync(changelogPath, 'utf8');
  const insertAfter = '---\n';
  const idx = existing.indexOf(insertAfter);
  const updated =
    idx !== -1
      ? existing.slice(0, idx + insertAfter.length) +
        '\n' +
        newEntry +
        '\n' +
        existing.slice(idx + insertAfter.length)
      : newEntry + '\n\n' + existing;

  writeFileSync(changelogPath, updated, 'utf8');
  console.log(`\n✅  CHANGELOG.md updated`);

  // Bump package.json
  pkg.version = newVersion;
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
  console.log(`✅  package.json → v${newVersion}`);

  // Confirm before committing
  const go = await prompt(rl, `\nCommit, tag, and push? (y/N): `);
  if (go.trim().toLowerCase() !== 'y') {
    console.log('Aborted. Files updated locally but nothing committed.');
    process.exit(0);
  }

  git('add CHANGELOG.md package.json');
  git(`commit -m "chore(release): v${newVersion}"`);
  git(`tag -a v${newVersion} -m "v${newVersion}"`);
  console.log(`✅  Committed and tagged v${newVersion}`);

  const pushTags = await prompt(rl, `Push to origin? (y/N): `);
  if (pushTags.trim().toLowerCase() === 'y') {
    git('push');
    git('push --tags');
    console.log(`✅  Pushed`);
  }

  console.log('\n🎉  Release complete!\n');
} finally {
  rl.close();
}
