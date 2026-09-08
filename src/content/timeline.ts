export interface TimelineImage {
  colSpan: number;
  rowSpan: number;
  src: string;
  alt: string;
}

export interface Item {
  title: string;
  date: string;
  description: Array<string>;
  images: Array<TimelineImage>;
}

const CLOUDINARY = 'https://res.cloudinary.com/cheezytony/image/upload';

const IMG = {
  credpal: `${CLOUDINARY}/v1774353617/Portfolio/z7gdqijpheiqdztgbpsh_l0v7yv.webp`,
  mightyi: `${CLOUDINARY}/v1774353617/Portfolio/frrc57zscjb5v3w1wnp3_dxameu.webp`,
  mightyNg: `${CLOUDINARY}/v1774353617/Portfolio/nxkh7aocsevjy5i4oab5_n5vdnn.webp`,
  adlantique: `${CLOUDINARY}/v1774353616/Portfolio/cs6nim7v40zlrit6xnez_f2lfcc.webp`,
  trifta: `${CLOUDINARY}/v1774353616/Portfolio/xqokgivxv1pezkjpf6sp_nla0cp.webp`,
  fluxhub: `${CLOUDINARY}/v1774353616/Portfolio/apchxjov4pmxrho3m1x0_cgrhwx.webp`,
  datatable: `${CLOUDINARY}/v1774353616/Portfolio/rnirbnxwip2qrsaqhvet_l2x4zw.webp`,
  vue3Form: `${CLOUDINARY}/v1774353616/Portfolio/vn9t1fnfk1hjsfpitksn_oflwuj.webp`,
  storage: `${CLOUDINARY}/v1774353617/Portfolio/tgusatsdh7sabshs1edq1_uui69v.webp`,
  rockcity: `${CLOUDINARY}/v1774353617/Portfolio/projects-rockcity-101-9-fm_ibkr0n.webp`,
  votu: `${CLOUDINARY}/q_auto/f_auto/v1775655844/Portfolio/projects-votu.png`,
  danielKoya: `${CLOUDINARY}/v1774354088/Portfolio/projects-daniel-koya_d6xcxn.png`,
  // TODO: replace these four generics with real screenshots or diagrams.
  generic1: '/images/timeline-1.png',
  generic2: '/images/timeline-2.png',
  generic3: '/images/timeline-3.png',
  generic4: '/images/timeline-4.png',
} as const;

export const TIMELINE: Array<Item> = [
  {
    title: 'Learning to work beside designers',
    date: '2017',
    description: [
      'My first job was at an agency, which means my first year of writing software was spent sitting next to the people who had drawn the thing I was building. There was no handoff and no spec. A designer would lean over, say the spacing was wrong, and I would fix it while they watched.',
      'I built the agency’s own site that year, hand-written markup and SASS with no framework underneath it, plus client work across a range of industries. I also pushed the team onto AJAX-driven interactions so pages stopped reloading on every action. Nothing here was sophisticated. But it is where I learned that "technically correct" and "right" are different words, and that the second one is the job.',
    ],
    images: [
      { colSpan: 2, rowSpan: 2, src: IMG.mightyi, alt: 'The Mighty Interactive agency website, built in hand-written markup and SASS' },
      { colSpan: 1, rowSpan: 2, src: IMG.mightyNg, alt: 'Mighty NG, a full-stack airtime and data purchasing platform' },
      { colSpan: 1, rowSpan: 2, src: IMG.adlantique, alt: 'The Adlantique marketing agency site, built on PUG templates over a Bootstrap grid' },
    ],
  },
  {
    title: 'The web app, built alone',
    date: '2018 – 2023',
    description: [
      'CredPal lent money to Nigerians who could not get a card from a bank. I joined early enough that the product was still being decided rather than maintained. The original backend was PHP, built with a small team of other engineers. The web application on top of it I built by myself.',
      'That one app eventually carried the whole consumer surface: credit applications, buy-now-pay-later checkout, savings, bill payments and a credit builder for people trying to establish a score from nothing. Owning all of it alone meant there was nobody to hand a hard problem to, which is a bad way to run a team and an extremely fast way to learn.',
    ],
    images: [
      { colSpan: 2, rowSpan: 2, src: IMG.credpal, alt: 'The CredPal consumer credit platform, serving hundreds of thousands of users' },
      { colSpan: 1, rowSpan: 2, src: IMG.generic1, alt: 'Credit applications, BNPL checkout, savings and bill payments in one web application' },
      { colSpan: 1, rowSpan: 2, src: IMG.generic2, alt: 'The credit builder product, helping users establish a credit score from nothing' },
    ],
  },
  {
    title: 'Rebuilding the backend on Node, NestJS and RabbitMQ',
    date: '2018 – 2023',
    description: [
      'The PHP monolith had done its job and become the reason nobody could ship. I led the rebuild of the entire product backend onto Node and NestJS, decomposed into services, with RabbitMQ carrying work between them and a REST surface serving the mobile apps.',
      'The broker is what made the decomposition survivable. Once a repayment or a disbursement is a message on a queue rather than a function call, a consumer that falls over retries instead of losing the work, a slow downstream stops being an outage upstream, and anything that keeps failing lands in a dead-letter queue where a human can look at it rather than vanishing. It was phased deliberately so the business never stopped while it happened. The core API settled at over a million requests a day at 99.9% uptime. The interesting part was never the diagram, it was sequencing the moves so that at no point did a half-migrated system have to be correct in two places at once.',
    ],
    images: [
      { colSpan: 2, rowSpan: 2, src: IMG.generic3, alt: 'Message-driven service architecture on Node, NestJS and RabbitMQ' },
      { colSpan: 1, rowSpan: 2, src: IMG.credpal, alt: 'The CredPal platform the rebuild was carried out beneath' },
      { colSpan: 1, rowSpan: 2, src: IMG.generic4, alt: 'REST endpoints serving the mobile applications after the rebuild' },
    ],
  },
  {
    title: 'The ledger, from scratch',
    date: '2018 – 2023',
    description: [
      'When you are moving other people’s money, the ledger is the system every other system eventually answers to. I designed ours from the ground up.',
      'Every account carried two balances. The available balance moves the moment a debit is authorised; the settled balance waits for the provider to confirm it. Almost every hard problem in the system lives in the gap between those two numbers. Movements between accounts wrote paired legs, a debit on one side and a credit on the other, and the transaction log was append-only, recording the balance both before and after each movement so a balance could be replayed and proved rather than simply trusted. Corrections were written as new movements, never as edits to history.',
      'The rest was about what happens when the outside world misbehaves: a provider webhook that arrives twice, two debits racing against the same balance, and a callback that never arrives at all while something still has to be true about state in the gap. It is the piece of engineering I am proudest of, and the one I would most want to be asked about.',
    ],
    images: [
      { colSpan: 2, rowSpan: 2, src: IMG.generic1, alt: 'Double-entry ledger and transaction architecture' },
      { colSpan: 1, rowSpan: 2, src: IMG.credpal, alt: 'The consumer credit platform the ledger sat underneath' },
      { colSpan: 1, rowSpan: 2, src: IMG.generic2, alt: 'Reconciliation and balance integrity under duplicate and delayed webhooks' },
    ],
  },
  {
    title: 'Deciding who gets credit',
    date: '2018 – 2023',
    description: [
      'Lending to people with no credit history means you cannot buy the answer from a bureau. You have to build the judgement yourself. I worked on the underwriting engine that took an application apart and decided what, if anything, to offer.',
      'Underneath it sat identity: user verification and biometric checks, because before you can decide whether to trust someone you have to establish that they are who they say they are. This is the part of fintech people rarely put in a portfolio because it is regulated, unglamorous and full of edge cases involving real people who will be told no. It is also the part where getting it wrong costs the most, in both directions.',
    ],
    images: [
      { colSpan: 2, rowSpan: 2, src: IMG.generic4, alt: 'Application underwriting and credit decisioning engine' },
      { colSpan: 1, rowSpan: 2, src: IMG.generic3, alt: 'User identification and biometric verification flow' },
      { colSpan: 1, rowSpan: 2, src: IMG.credpal, alt: 'The credit products the underwriting engine served' },
    ],
  },
  {
    title: 'Turning a product into a platform',
    date: '2018 – 2023',
    description: [
      'At some point the most valuable thing CredPal could do was stop being a destination and start being a payment option inside somebody else’s checkout. That meant building for other engineers rather than for end users.',
      'A public REST API, a JavaScript SDK, and a WooCommerce plugin so a merchant could offer instalment credit without writing any integration code at all. It went live across thousands of stores, including Jumia, Slot and Hard Rock Cafe. Building something other companies integrate against changes what you owe them: versioning, backwards compatibility, documentation a stranger can follow, and error responses that tell an integrator what they did wrong rather than what your server felt about it.',
    ],
    images: [
      { colSpan: 2, rowSpan: 2, src: IMG.generic2, alt: 'Public REST API, JavaScript SDK and WooCommerce plugin for merchant integration' },
      { colSpan: 1, rowSpan: 2, src: IMG.credpal, alt: 'CredPal instalment credit offered inside merchant checkouts' },
      { colSpan: 1, rowSpan: 2, src: IMG.generic1, alt: 'Integrations live across thousands of stores including Jumia, Slot and Hard Rock Cafe' },
    ],
  },
  {
    title: 'The marketing site as the front door',
    date: '2018 – 2023',
    description: [
      'The marketing site was the primary acquisition channel for the credit products, and for most people it was the only part of CredPal they would ever see. I owned the whole front-end surface: page architecture, the interactive components, the rendering strategy and the design-to-code translation.',
      'The central decision was rendering. Static generation is fast and crawlable but goes stale; server rendering stays fresh but puts every visit through a server for content that rarely changes. I used both, statically generating the marketing pages and reserving server rendering for the genuinely dynamic surfaces. On Nigerian mobile connections that is not an academic choice, it is the difference between a page that arrives and a page that gets abandoned. Organic traffic rose 30% and engagement and conversion rose 25%.',
    ],
    images: [
      { colSpan: 2, rowSpan: 2, src: IMG.credpal, alt: 'The CredPal marketing site, built in Vue and Nuxt with SSR and SSG' },
      { colSpan: 1, rowSpan: 2, src: IMG.trifta, alt: 'Trifta, a thrift savings and micro-investment platform built in Nuxt' },
      { colSpan: 1, rowSpan: 2, src: IMG.fluxhub, alt: 'Fluxhub Legal, a legal services site built in Nuxt and TypeScript' },
    ],
  },
  {
    title: 'Wallets, payments and credit on Kafka',
    date: '2023',
    description: [
      'The last thing I worked on before I left at the end of 2023 was Circle Wealth, a savings and alternative-investments product. Its backend was a set of microservices with Kafka as the event backbone between them, and I built three of them: wallet, payments and credit.',
      'A wallet is a ledger problem wearing different clothes. Balances have to be derived rather than stored and edited, holds have to be placed before money moves and released again if it does not, and the same request arriving twice has to produce exactly one outcome. Kafka is what let the three services stay independent of each other: a completed payment is published once, and whoever cares about it consumes it on their own schedule, so credit never needed a reference to payments and neither needed to know how many other consumers existed.',
      'The app reached the App Store in mid 2024, after my time on it had ended.',
    ],
    images: [
      { colSpan: 2, rowSpan: 2, src: IMG.generic3, alt: 'Microservice backend with Kafka as the event backbone between wallet, payment and credit services' },
      { colSpan: 1, rowSpan: 2, src: IMG.generic1, alt: 'Wallet service handling derived balances, holds and idempotent transfers' },
      { colSpan: 1, rowSpan: 2, src: IMG.generic4, alt: 'Payment and credit services consuming published payment events' },
    ],
  },
  {
    title: 'An automated claims pipeline',
    date: '2024',
    description: [
      'Casava sold insurance to people who had never held a policy before, which meant the product had to explain itself at every step. Underwriting, renewals and claims are genuinely complicated workflows, and most of the work was turning that complexity into something a person could move through without help.',
      'The piece I would point at is the claims pipeline. Claims were being handled by people passing work between each other, so I automated the path end to end and cut average processing time by 40%. Customer satisfaction moved with it. Claims is the moment an insurance customer finds out whether the product was real, so it was the right thing to make fast.',
    ],
    images: [
      { colSpan: 2, rowSpan: 2, src: IMG.generic2, alt: 'Automated insurance claims processing pipeline' },
      { colSpan: 1, rowSpan: 2, src: IMG.generic4, alt: 'Underwriting and renewals workflows rebuilt as guided user journeys' },
      { colSpan: 1, rowSpan: 2, src: IMG.generic1, alt: 'Claims processing time reduced by 40%' },
    ],
  },
  {
    title: 'Three packages, given away',
    date: 'Ongoing',
    description: [
      'Small libraries I extracted from real projects and published because I was tired of writing them again. Between them they have passed 34,000 downloads, which mostly means strangers I will never meet have this code running somewhere.',
      'A customisable datatable for Vue and Bootstrap (past 22,000), a zero-dependency form validation plugin for Vue 3 and TypeScript (past 11,000), and a TypeScript-first localStorage wrapper that supports expiry the way cookies do, so cached values go stale on their own instead of lingering until someone clears site data. None of them are ambitious. All of them saved me from writing the same thing a fourth time.',
    ],
    images: [
      { colSpan: 2, rowSpan: 2, src: IMG.datatable, alt: 'bootstrap-vue-datatable, a customisable datatable package for Vue and Bootstrap' },
      { colSpan: 1, rowSpan: 2, src: IMG.vue3Form, alt: 'vue3-form, a zero-dependency form validation plugin for Vue 3 and TypeScript' },
      { colSpan: 1, rowSpan: 2, src: IMG.storage, alt: 'storagedotjs, a TypeScript-first localStorage wrapper with cookie-style expiry' },
    ],
  },
  {
    title: 'Independent, and building',
    date: '2025 – Present',
    description: [
      'Consulting on contract, which has turned out to suit me. Backend engineering for African fintech and commerce clients: event-driven services in NestJS and TypeScript on PostgreSQL and Redis, containerised and deployed to AWS ECS, with least-privilege access models so client accounts carry no long-lived credentials and revoking me is a one-step operation.',
      'Alongside the client work: Rockcity 101.9 FM, a cross-platform radio app in Expo and React Native with live streaming, background playback, sleep timers and alarms, now on both stores. Votu, an open-source polling platform on NestJS and Next.js. And this site, rebuilt from nothing, where the homepage is the navigation and the columns redistribute their widths as you move across them while flooding the page with that section’s colour. It is deliberately unsubtle, and I spent far longer tuning the easing than I did building it.',
    ],
    images: [
      { colSpan: 2, rowSpan: 2, src: IMG.rockcity, alt: 'Rockcity 101.9 FM, a cross-platform radio app built in Expo and React Native' },
      { colSpan: 1, rowSpan: 2, src: IMG.votu, alt: 'Votu, an open-source polling platform built with NestJS and Next.js' },
      { colSpan: 1, rowSpan: 2, src: IMG.danielKoya, alt: 'A portfolio site built for the designer Daniel Koya in Nuxt and TypeScript' },
    ],
  },
];
