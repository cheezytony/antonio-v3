export interface Project {
  badges?: Array<string>;
  client?: {
    name: string;
  };
  description: Array<string>;
  screenshots: Array<string>;
  tags: Array<string>;
  title: string;
  subtitle?: string;
  url: Array<string | { label: string; url: string }>;
}

export const PROJECTS: Array<Project> = [
  
  {
    title: 'Daniel Koya Website Development',
    description: [
      "A portfolio website for one of Africa's best graphic and UI/UX designers.",
    ],
    screenshots: [
      'https://res.cloudinary.com/cheezytony/image/upload/v1774354088/Portfolio/projects-daniel-koya_d6xcxn.png',
    ],
    url: ['https://danielkoya.com'],
    client: {
      name: 'Daniel Koya',
    },
    tags: ['Website', 'PWA', 'Vue', 'Nuxt', 'TypeScript'],
  },
  {
    title: 'Rockcity 101.9 FM Mobile',
    description: [
      'A cross-platform mobile app for Rockcity 101.9 FM radio station, built with Expo and React Native.',
      '',
      '- Live broadcast streaming',
      '- Sleep timer',
      '- Custom alarms',
      '- Background audio playback',
    ],
    screenshots: [
      'https://res.cloudinary.com/cheezytony/image/upload/v1774353617/Portfolio/projects-rockcity-101-9-fm_ibkr0n.webp',
    ],
    url: [
      {
        label: 'iOS',
        url: 'https://apps.apple.com/ng/app/rockcity-101-9-fm/id6759060485',
      },
      {
        label: 'Android',
        url: 'https://play.google.com/store/apps/details?id=com.rockcityfm.mobile',
      },
    ],
    tags: ['Mobile App', 'Expo', 'React Native', 'Cross-platform', 'Radio'],
  },
  {
    title: 'CredPal Product Development',
    description: [
      "A full-stack micro-service system for Africa's leading pioneer for consumer credit and bill payments.",
      '',
      '- Micro-Service Architecture',
      '- SaaS Architecure (Woocommerce plugins, JavaScript SDK, Public REST API etc)',
      '- Consumer Credit Applications',
      '- Thorough Application Underwriting',
      '- User identification and Biometric Verification',
      '- User Savings',
      '- Bill Payments',
      '- Credit Builder (Improve Credit Score)',
      '- Integrations with thousands of stores across the globe e.g. Jumia, Slot, Hard Rock Cafe',
    ],
    screenshots: [
      'https://res.cloudinary.com/cheezytony/image/upload/v1774353617/Portfolio/z7gdqijpheiqdztgbpsh_l0v7yv.webp',
    ],
    url: [
      { label: 'View Project', url: 'https://credpal.com' },
      { label: 'Case study: the ledger', url: '/writing/two-balances-and-a-log' },
    ],
    client: {
      name: 'CredPal (Crednet Technologies)',
    },
    tags: [
      'Website',
      'Micro-service',
      'Full-stack',
      'Frontend',
      'Backend',
      'PHP',
      'Laravel',
      'Node.Js',
      'Next.Js',
      'Vue',
      'Nuxt',
      'React',
      'Next',
    ],
  },
  {
    title: 'Bootstrap/Vue Datatable',
    description: [
      'A customisable datatable package on npm for Vue and Bootstrap, past 22,000 downloads and still installed by people I have never met.',
    ],
    badges: [
      'https://img.shields.io/npm/dy/bootstrap-vue-datatable?style=for-the-badge',
      'https://img.shields.io/bundlephobia/minzip/bootstrap-vue-datatable?style=for-the-badge',
    ],
    screenshots: [
      'https://res.cloudinary.com/cheezytony/image/upload/v1774353616/Portfolio/rnirbnxwip2qrsaqhvet_l2x4zw.webp',
    ],
    url: ['https://www.npmjs.com/bootstrap-vue-datatable'],
    tags: ['NPM', 'Library', 'Vue', 'Bootstrap'],
  },
  {
    title: 'Nahcon Hajj 360',
    description: [''],
    screenshots: [],
    url: ['https://staging.auth.hajj360.com.ng'],
    tags: [
      'Full-stack',
      'Node.js',
      'TypesSript',
      'Nest.js',
      'Redis',
      'PostgreSQL',
      'React.js',
      'Next.js',
      'Tailwindcss',
      'Log Rocket',
    ],
  },
  {
    title: 'Casava Core Architecture',
    description: [
      "An entire full-stack, micro-service system for one of Africa's leading Microinsurance Providers",
      '',
      '- Multiple Insurance Products e.g. Health Insurance, Personal Accident, Auto Insurance, Business Insurance etc.',
      '- Insurance Product Plans',
      '- Quote Generation',
      '- Policy Generation',
      '- Policy Renewal',
      '- Insurance Claims',
    ],
    screenshots: [],
    url: ['https://casava.com'],
    tags: [
      'Java/Spring Boot',
      'PHP',
      'Laravel',
      'Node.js',
      'TypeScript',
      'Vue.js',
      'Nuxt.js',
      'Next.js',
      'React',
      'Tailwind CSS',
      'Docker',
      'Kubernetes',
      'Paystack',
      'PostgreSQL',
      'MySQL',
      'Redis',
    ],
  },
  {
    title: 'Bloom',
    description: [
      'A full-stack web-app for Insurance Sales Agents to buy and manage Quotes, Policies and Claims on behalf of customers.',
      '',
      '- Insurance Product Plans',
      '- Account Creation',
      '- Product Selection e.g. Health Insurance, Personal Accident, Auto Insurance, Business Insurance etc.',
      '- Quote Generation',
      '- Quote Sharability via Social Media',
      '- Policy Generation',
      '- Policy Renewal',
      '- Dynamic Quote Form',
      '- Dynamic Quote Form Sharability via Social Media',
    ],
    screenshots: [],
    url: ['https://partner.casava.com'],
    tags: [
      'Java/Spring Boot',
      'TypeScript',
      'React',
      'Next.js',
      'Chakra UI',
      'Docker',
      'Kubernetes',
      'Google Cloud',
      'Paystack',
      'PostgreSQL',
      'MySQL',
      'Redis',
    ],
  },
  {
    title: 'SMEDAN',
    subtitle: '(Small & Medium Enterprises Development Agency of Nigeria)',
    description: [
      'A full-stack micro-service app for business owners to insure their businesses regardless of size',
      '',
      '- Business Registration',
      '- Health Products like Health Insurance, Personal Accident',
      '- Insurance Product Plans',
      '- Quote Generation',
      '- Policy Generation',
      '- Policy Renewal',
    ],
    screenshots: [],
    url: ['https://health.smedanregister.ng'],
    tags: [
      'PHP',
      'Laravel',
      'TypeScript',
      'Vue',
      'Nuxt.js',
      'TailwindCSS',
      'Docker',
      'Kubernetes',
      'AWS',
      'Google Cloud',
      'Paystack',
      'PostgreSQL',
      'MySQL',
      'Redis',
    ],
  },
  {
    title: 'Mighty NG Product Development',
    description: [
      '- A full-stack application built for consumers to buy airtime and internet data for themselves and/or beneficiaries',
      '',
      '- User Account Managment',
      '- Cart Managment',
      '- Product Checkout',
      '- Beneficiary Managment',
    ],
    screenshots: [
      'https://res.cloudinary.com/cheezytony/image/upload/v1774353617/Portfolio/nxkh7aocsevjy5i4oab5_n5vdnn.webp',
    ],
    url: ['https://mighty.ng'],
    client: {
      name: 'Mighty Interactive',
    },
    tags: [
      'Web App',
      'Full-stack',
      'Frontend',
      'Backend',
      'PHP',
      'Laravel',
      'JavaScript',
      'jQuery',
    ],
  },
  {
    title: 'Mighty Interactive Website Development',
    description: [
      'The agency’s own site, and the one that had to sell the agency. Hand-built markup and SASS with no framework underneath it, animated with jQuery, responsive and cross-browser at a time when that still meant testing it yourself.',
      'Built while I was on staff at Mighty Interactive, iterating directly with the designers on stakeholder feedback. This is where I learned to work at a designer’s elbow rather than at the end of a handoff.',
    ],
    screenshots: [
      'https://res.cloudinary.com/cheezytony/image/upload/v1774353617/Portfolio/frrc57zscjb5v3w1wnp3_dxameu.webp',
    ],
    url: ['https://mightyi.com'],
    client: {
      name: 'Mighty Interactive',
    },
    tags: ['Website', 'HTML', 'CSS', 'SASS/SCSS', 'JavaScript', 'jQuery'],
  },
  {
    title: 'Adlantique Website Design',
    description: [
      'Marketing site for a Lagos advertising and brand agency, whose own site had to demonstrate the standard they sell to clients.',
      'Built on PUG templates over a Bootstrap grid so repeated sections — service cards, case study tiles, testimonials — came from single partials rather than duplicated markup, which kept the page consistent as the copy kept changing.',
    ],
    screenshots: [
      'https://res.cloudinary.com/cheezytony/image/upload/v1774353616/Portfolio/cs6nim7v40zlrit6xnez_f2lfcc.webp',
    ],
    url: ['https://adlantique.com'],
    client: {
      name: 'Adlantique',
    },
    tags: [
      'Website',
      'PUG',
      'HTML',
      'CSS',
      'Bootstrap',
      'JavaScript',
      'jQuery',
    ],
  },
  {
    title: 'Trifta Website design',
    description: [
      'Marketing site for a Nigerian fintech bringing thrift savings, micro-investments and interest-free loans to people the banks do not reach — the digital version of ajo and esusu, with verified merchants instead of trust alone.',
      'Built in Nuxt with TypeScript. The audience arrives on cheap Android phones over patchy mobile data, so the whole site is statically generated and image-optimised; the job of the page is to explain a familiar savings practice in an unfamiliar form and get people to the app store.',
    ],
    screenshots: [
      'https://res.cloudinary.com/cheezytony/image/upload/v1774353616/Portfolio/xqokgivxv1pezkjpf6sp_nla0cp.webp',
    ],
    url: ['https://trifta.com'],
    client: {
      name: 'Trifta',
    },
    tags: ['Website', 'Vue', 'Nuxt', 'TypeScript'],
  },
  {
    title: 'Fluxhub Legal Website Development',
    description: [
      'Marketing and practice site for a legal services firm, built in Nuxt with TypeScript.',
      'Legal sites live or die on whether a stranger can find the one service that applies to them and then work out how to make contact, so the structure was built around service pages and a clear route to enquiry rather than around the firm’s org chart.',
    ],
    screenshots: [
      'https://res.cloudinary.com/cheezytony/image/upload/v1774353616/Portfolio/apchxjov4pmxrho3m1x0_cgrhwx.webp',
    ],
    url: ['https://fluxhublegal.com'],
    client: {
      name: 'Fluxhub Legal',
    },
    tags: ['Website', 'Vue', 'Nuxt', 'TypeScript'],
  },
  {
    title: 'Vue3 Form NPM Package',
    description: [
      'A form validation plugin on npm for Vue 3 and TypeScript, with zero dependencies and a wide range of validation rules. Past 11,000 downloads.',
    ],
    badges: [
      'https://img.shields.io/npm/dy/vue3-form?style=for-the-badge',
      'https://img.shields.io/bundlephobia/min/vue3-form?style=for-the-badge',
    ],
    screenshots: [
      'https://res.cloudinary.com/cheezytony/image/upload/v1774353616/Portfolio/vn9t1fnfk1hjsfpitksn_oflwuj.webp',
    ],
    tags: ['NPM', 'Library', 'Vue', 'TypeScript'],
    url: ['https://npmjs.com/vue3-form'],
  },
  {
    title: 'Storagedotjs NPM Package',
    description: [
      'A TypeScript-first localStorage wrapper that supports data expiry the way cookies do, so cached values go stale on their own instead of lingering until someone clears site data.',
    ],
    badges: [
      'https://img.shields.io/npm/dy/storagedotjs?style=for-the-badge',
      'https://img.shields.io/bundlephobia/min/storagedotjs?style=for-the-badge',
    ],
    screenshots: [
      'https://res.cloudinary.com/cheezytony/image/upload/v1774353617/Portfolio/tgusatsdh7sabshs1edq1_uui69v.webp',
    ],
    tags: ['NPM', 'Library', 'TypeScript'],
    url: ['https://npmjs.com/storagedotjs'],
  },
  {
    title: 'Votu',
    description: [
      'An open-source polling platform built with AI for creating, managing and sharing polls.',
      '',
      '- Create and manage polls with multiple options',
      '- Search and filter polls — publicly visible to all users',
      '- Authentication required to place a vote',
      '- Full voter transparency — see who voted on each poll and option',
    ],
    screenshots: [
      'https://res.cloudinary.com/cheezytony/image/upload/q_auto/f_auto/v1775655844/Portfolio/projects-votu.png',
    ],
    url: [
      { label: 'App', url: 'https://votu-frontend.vercel.app/' },
      { label: 'GitHub', url: 'https://github.com/cheezytony/votu' },
    ],
    tags: [
      'Web App',
      'Full-stack',
      'Open Source',
      'AI',
      'TypeScript',
      'NestJS',
      'Next.js',
      'Polls',
    ],
  },
].filter((project) => {
  if (project.screenshots.length <= 0) {
    return false;
  }

  return true;
});
