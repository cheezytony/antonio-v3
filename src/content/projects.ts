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
      { label: 'iOS', url: 'https://apps.apple.com/ng/app/rockcity-101-9-fm/id6759060485' },
      { label: 'Android', url: 'https://play.google.com/store/apps/details?id=com.rockcityfm.mobile' },
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
    url: ['https://credpal.com'],
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
      'A customisable datatable package on npm for Vuejs and Bootstrap that has gotten over ten thousand downloads.',
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
      'Ipsam soluta officiis corrupti aspernatur deserunt asperiores repellendus temporibus dicta quasi est odit quaerat perferendis, maiores corporis qui ducimus repellat unde perspiciatis.',
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
      'Ipsam soluta officiis corrupti aspernatur deserunt asperiores repellendus temporibus dicta quasi est odit quaerat perferendis, maiores corporis qui ducimus repellat unde perspiciatis.',
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
      'Ipsam soluta officiis corrupti aspernatur deserunt asperiores repellendus temporibus dicta quasi est odit quaerat perferendis, maiores corporis qui ducimus repellat unde perspiciatis.',
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
      'Ipsam soluta officiis corrupti aspernatur deserunt asperiores repellendus temporibus dicta quasi est odit quaerat perferendis, maiores corporis qui ducimus repellat unde perspiciatis.',
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
      'An easy to use form validation plugin on npm for Vue3 and TypeScript, with zero dependencies and a wide range of validation rules. This usually gets about a couple dozen downloads a week.',
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
      'A simple and easy to use localstorage package that supports data expiry like cookies. This usually gets about a couple dozen downloads a week.',
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
].filter((project) => {
  if (project.screenshots.length <= 0) {
    return false;
  }

  return true;
});
