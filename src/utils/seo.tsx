import type { AnyRouteMatch } from '@tanstack/react-router';
import { colors } from '~/theme/tokens/colors';

interface RegisterPageSeoOptions {
  title: string;
  description?: string;
  keywords?: string;
  screenshot?: string;
  themeColor?: string;
  pathname?: string;
}

const DEFAULTS = {
  TITLE: 'Chimezie Antonio Okoro',
  DESCRIPTION: 'Digital Alchemist, gaming specialist and son of Christ',
  KEYWORDS: 'software engineer, developer, gamer, christian',
  SCREENSHOT: '/images/thumbnail.png',
  THEMECOLOR: colors.theme.red.value,
} as const;

export function registerPageSeo(
  options: RegisterPageSeoOptions,
  useDefaultValues = true,
): {
  links?: AnyRouteMatch['links'];
  scripts?: AnyRouteMatch['headScripts'];
  meta?: AnyRouteMatch['meta'];
} {
  const title =
    options.title.length > 0
      ? `${options.title} - ${DEFAULTS.TITLE}`
      : DEFAULTS.TITLE;
  const description =
    options.description ?? (useDefaultValues ? DEFAULTS.DESCRIPTION : '');
  const screenshot =
    options.screenshot ?? (useDefaultValues ? DEFAULTS.SCREENSHOT : undefined);
  const keywords =
    options.keywords ?? (useDefaultValues ? DEFAULTS.KEYWORDS : '');
  const themeColor =
    options.themeColor ?? (useDefaultValues ? DEFAULTS.THEMECOLOR : undefined);

  const pathname = options.pathname;
  const domain = 'https://antoniookoro.com';
  const pageUrl = [domain, pathname?.replace(/(^\/)|(\/$)/g, '')]
    .filter(Boolean)
    .join('/');

  const meta = [
    { name: 'title', title },
    { name: 'description', content: description },

    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@antonio_okoro' },
    { name: 'twitter:creator', content: '@antonio_okoro' },

    { name: 'og:site_name', content: 'Chimezie Antonio Okoro' },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
    { name: 'og:url', content: pageUrl },

    { name: 'author', content: 'Antonio Chimezie Okoro' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'theme-color', content: themeColor },
    // { name: 'robots', content: 'index, follow' },
  ];

  if (keywords.length) {
    meta.push({ name: 'keywords', content: keywords });
  }

  if (screenshot) {
    meta.push(
      { name: 'image', content: screenshot },
      { name: 'screenshot', content: screenshot },
      { name: 'twitter:image', content: screenshot },
      { name: 'og:image', content: screenshot },
    );
  }

  return {
    meta,
    links: [
      { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
      { rel: 'canonical', href: pageUrl },
    ],
  } as const;
}
