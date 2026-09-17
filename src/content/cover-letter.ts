export type Lane = 'backend' | 'fullstack' | 'design';
export type OpenerKind = 'standard' | 'objection';

export interface LaneConfig {
  value: Lane;
  label: string;
  cv: string;
  proof: (fields: { company: string }) => Array<string>;
}

const STANDARD_OPENER = [
  'I have spent eight years building software for people with no margin for error. Consumer credit for Nigerians who could not get a card from a bank. Insurance for people who had never held a policy. Different sectors, same thing underneath: for the person on the other side, the software is not a product, it is the only door.',
];

export const LANES: Array<LaneConfig> = [
  {
    value: 'backend',
    label: 'Backend / fintech / platform',
    cv: 'Antonio Okoro - Senior Backend Engineer.pdf',
    proof: () => [
      'I designed the ledger and balance system at CredPal, a consumer credit platform serving hundreds of thousands of Nigerians. Every account carried two balances, one that moved the instant a debit was authorised and one that waited for the provider to confirm, and almost every hard problem in that system lived in the gap between them. Building it meant deciding what may never be mutated once written, how a duplicate webhook produces exactly one outcome, and what has to remain true when a callback never arrives at all. I have written the whole thing up at antoniookoro.com/writing/two-balances-and-a-log.',
      'Alongside that I led the rebuild of the entire product backend off a PHP monolith onto Node and NestJS over RabbitMQ, phased so the business never stopped; the core API settled at over a million requests a day at 99.9% uptime.',
    ],
  },
  {
    value: 'fullstack',
    label: 'Full stack / product engineering',
    cv: 'Antonio Okoro - Senior Full Stack Engineer.pdf',
    proof: () => [
      'At CredPal, a consumer credit platform serving hundreds of thousands of Nigerians, I built the entire consumer web application on my own, designed the ledger the money ran through, and owned the marketing site that acquired the customers. Credit applications, buy-now-pay-later checkout, savings, bill payments. Schema through interface, no handoffs, because there was nobody to hand it to.',
      'That is still how I prefer to work. The reason a feature stalls is almost never the hard part; it is the four boundaries it has to cross on the way out. I am most useful on teams small enough that one person can carry something the whole way.',
    ],
  },
  {
    value: 'design',
    label: 'Front-end / design engineering',
    cv: 'Antonio Okoro - Senior Design Engineer.pdf',
    proof: () => [
      'At CredPal I owned the marketing site, which was the primary acquisition channel for the credit products and, for most people, the only part of the company they would ever see. Vue and Nuxt, SSR and SSG, the interactive components, the whole surface. Organic traffic went up 30% and conversion 25%, but what I remember is that the rendering decision was not academic: on Nigerian mobile connections it is the difference between a page that arrives and a page that gets abandoned.',
      'The clearest example of the instinct is my own site, antoniookoro.com. The homepage is the navigation: full-height columns that redistribute their widths as you move across them while flooding the page with that section’s colour. Deliberately unsubtle, and I spent far longer tuning the easing than I did building it.',
    ],
  },
];

export const CLOSES: Array<{ value: string; label: string; text: string }> = [
  {
    value: 'overlap',
    label: 'Timezone overlap',
    text: 'I am Lagos-based, on WAT, with full overlap with EMEA and a solid afternoon overlap with US East. Available immediately.',
  },
  {
    value: 'relocation',
    label: 'Open to relocation',
    text: 'I am Lagos-based and open to relocation with sponsorship, which I would rather say now than in round three.',
  },
  {
    value: 'plain',
    label: 'Plain',
    text: 'I am Lagos-based and available immediately.',
  },
];

/** Phrases that make a letter sound like every other letter. */
export const BANNED_PHRASES = [
  'excited to apply',
  'thrilled to apply',
  'i am writing to apply',
  'long admired',
  'passionate about',
  'cutting-edge',
  'cutting edge',
  'world-class',
  'world class',
  'fast-paced environment',
  'wear many hats',
  'think outside the box',
  'proven track record',
  'team player',
  'synergy',
  'leverage my skills',
  'perfect fit',
  'dream job',
  'commitment to innovation',
  'industry-leading',
];

export interface LetterFields {
  company: string;
  role: string;
  whoItServes: string;
  hook: string;
  theirLine: string;
  lane: Lane;
  opener: OpenerKind;
  objection: string;
  close: string;
}

export const EMPTY_FIELDS: LetterFields = {
  company: '',
  role: '',
  whoItServes: '',
  hook: '',
  theirLine: '',
  lane: 'backend',
  opener: 'standard',
  objection: '',
  close: 'overlap',
};

export function buildLetter(fields: LetterFields): string {
  const company = fields.company.trim() || '{{COMPANY}}';
  const lane = LANES.find((l) => l.value === fields.lane) ?? LANES[0];
  const close =
    CLOSES.find((c) => c.value === fields.close)?.text ?? CLOSES[0].text;

  const paragraphs: Array<string> = [`Dear ${company} team,`];

  if (fields.opener === 'objection') {
    paragraphs.push(
      `I should be direct about one thing first. ${
        fields.objection.trim() || '{{OBJECTION}}'
      } If that is a hard line for this role, I would rather you know it in my first paragraph than discover it in a first call.`,
      'Here is why I think the conversation is still worth having.',
    );
  } else {
    paragraphs.push(...STANDARD_OPENER);
    paragraphs.push(
      `${company} is that door for ${
        fields.whoItServes.trim() || '{{WHO_IT_SERVES}}'
      }. ${fields.hook.trim() || '{{HOOK}}'}`,
    );
  }

  paragraphs.push(...lane.proof({ company }));

  if (fields.opener === 'objection' && fields.hook.trim()) {
    paragraphs.push(fields.hook.trim());
  }

  paragraphs.push(
    `Your posting puts its weight on ${
      fields.theirLine.trim() || '{{THEIR_LINE}}'
    }. That is the shape of most of what I have done, and it is the part I am best at.`,
    close,
    'Antonio Okoro\nantonio.c.okoro@gmail.com · +234 810 584 4849\nantoniookoro.com · linkedin.com/in/antonio-okoro',
  );

  return paragraphs.join('\n\n');
}

export type CheckLevel = 'pass' | 'warn' | 'fail';

export interface Check {
  level: CheckLevel;
  label: string;
  detail: string;
}

export function runChecks(fields: LetterFields, letter: string): Array<Check> {
  const checks: Array<Check> = [];
  const hook = fields.hook.trim();
  const company = fields.company.trim();

  // Word count, excluding the signature block.
  const body = letter.split('Antonio Okoro\n')[0];
  const words = body.split(/\s+/).filter(Boolean).length;

  checks.push({
    level: words < 200 || words > 400 ? 'fail' : words < 250 || words > 350 ? 'warn' : 'pass',
    label: `${words} words`,
    detail:
      words < 200
        ? 'Under 200 reads thin. Add the hook, or say more about why this role.'
        : words > 400
          ? 'Over 400 stops reading like you. Cut the weakest paragraph.'
          : words < 250 || words > 350
            ? 'Outside the 250 to 350 sweet spot, but sendable.'
            : 'In the range where it reads like a person wrote it.',
  });

  // Em dashes.
  const emDashes = (letter.match(/—/g) ?? []).length;
  checks.push({
    level: emDashes > 0 ? 'fail' : 'pass',
    label: emDashes > 0 ? `${emDashes} em dash${emDashes > 1 ? 'es' : ''}` : 'No em dashes',
    detail:
      emDashes > 0
        ? 'Replace with a comma, a colon or a full stop. It is a tell.'
        : 'Commas, colons and full stops only.',
  });

  // Banned phrases.
  const lower = letter.toLowerCase();
  const found = BANNED_PHRASES.filter((phrase) => lower.includes(phrase));
  checks.push({
    level: found.length > 0 ? 'fail' : 'pass',
    label: found.length > 0 ? `Filler phrase: “${found[0]}”` : 'No filler phrases',
    detail:
      found.length > 0
        ? `Found ${found.map((f) => `“${f}”`).join(', ')}. Say the specific thing instead.`
        : 'Nothing here that would survive in anyone else’s letter.',
  });

  // Hook specificity.
  const hookWords = hook.split(/\s+/).filter(Boolean).length;
  const mentionsCompany =
    company.length > 2 && hook.toLowerCase().includes(company.toLowerCase());
  const hasNumber = /\d/.test(hook);
  const hasQuote = /["“”']/.test(hook);
  const isSpecific = mentionsCompany || hasNumber || hasQuote;

  checks.push({
    level: hookWords === 0 ? 'fail' : hookWords < 12 ? 'warn' : isSpecific ? 'pass' : 'warn',
    label: hookWords === 0 ? 'No hook yet' : isSpecific ? 'Hook is specific' : 'Hook may be generic',
    detail:
      hookWords === 0
        ? 'This is the sentence that proves a human wrote the letter. It is not optional.'
        : hookWords < 12
          ? 'Too short to be checkable. What did you actually see?'
          : isSpecific
            ? 'Names something concrete, so it could not be sent to anyone else.'
            : 'It mentions no name, number or quote. Would this survive a find-and-replace of the company name?',
  });

  // The find-and-replace test on the whole letter.
  const survivesSwap =
    company.length > 2 &&
    letter.split(new RegExp(company, 'gi')).length - 1 <= 1;
  checks.push({
    level: company.length <= 2 ? 'warn' : survivesSwap ? 'warn' : 'pass',
    label: survivesSwap ? 'Company named once' : 'Company named throughout',
    detail: survivesSwap
      ? 'Only the salutation mentions them. Work them into the hook so the letter is about them, not about you.'
      : 'The letter is anchored to this specific company.',
  });

  // Objection discipline.
  if (fields.opener === 'objection') {
    const objection = fields.objection.trim();
    checks.push({
      level: objection.length === 0 ? 'fail' : 'pass',
      label: objection.length === 0 ? 'Objection missing' : 'Objection named',
      detail:
        objection.length === 0
          ? 'You chose the objection-first opener. Name the gap, do not apologise for it.'
          : 'Named in the first paragraph, which reads as confidence rather than hope.',
    });
  }

  // Quoted posting line.
  checks.push({
    level: fields.theirLine.trim().length === 0 ? 'fail' : 'pass',
    label: fields.theirLine.trim().length === 0 ? 'No line from the posting' : 'Posting line quoted',
    detail:
      fields.theirLine.trim().length === 0
        ? 'Lift a phrase from the posting verbatim so the bridge is theirs, not yours.'
        : 'The bridge quotes them, which proves you read it.',
  });

  return checks;
}

export const HONESTY_PROMPTS: Array<{ id: string; label: string }> = [
  {
    id: 'opened',
    label:
      'I opened their product or site myself, and the hook above is something I actually saw.',
  },
  {
    id: 'sourced',
    label:
      'Every number and claim in this letter is one I can source and defend in an interview.',
  },
  {
    id: 'aloud',
    label:
      'I have read the assembled letter aloud, and there is nothing in it I would not say out loud.',
  },
];
