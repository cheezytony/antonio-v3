import { IconAdonisJs } from '@/components/icons/icon-adonis-js';
import { IconApache } from '@/components/icons/icon-apache';
import { IconAsana } from '@/components/icons/icon-asana';
import { IconAws } from '@/components/icons/icon-aws';
import { IconBootstrap } from '@/components/icons/icon-bootstrap';
import { IconChakraUi } from '@/components/icons/icon-chakra-ui';
import { IconComposer } from '@/components/icons/icon-composer';
import { IconCss } from '@/components/icons/icon-css';
import { IconDigitalOcean } from '@/components/icons/icon-digital-ocean';
import { IconDocker } from '@/components/icons/icon-docker';
import { IconExpressJs } from '@/components/icons/icon-express-js';
import { IconFigma } from '@/components/icons/icon-figma';
import { IconGit } from '@/components/icons/icon-git';
import { IconGithub } from '@/components/icons/icon-github';
import { IconGitlab } from '@/components/icons/icon-gitlab';
import { IconGraphql } from '@/components/icons/icon-graphql';
import { IconJavaScript } from '@/components/icons/icon-javascript';
import { IconJest } from '@/components/icons/icon-jest';
import { IconJira } from '@/components/icons/icon-jira';
import { IconJquery } from '@/components/icons/icon-jquery';
import { IconLaravel } from '@/components/icons/icon-laravel';
import { IconLinux } from '@/components/icons/icon-linux';
import { IconMacos } from '@/components/icons/icon-macos';
import { IconMongodb } from '@/components/icons/icon-mongodb';
import { IconMysql } from '@/components/icons/icon-mysql';
import { IconNetlify } from '@/components/icons/icon-netlify';
import { IconNextJs } from '@/components/icons/icon-next-js';
import { IconNginx } from '@/components/icons/icon-nginx';
import { IconNodejs } from '@/components/icons/icon-node-js';
import { IconNpm } from '@/components/icons/icon-npm';
import { IconNuxtJs } from '@/components/icons/icon-nuxt-js';
import { IconPhp } from '@/components/icons/icon-php';
import { IconPhpunit } from '@/components/icons/icon-phpunit';
import { IconPnpm } from '@/components/icons/icon-pnpm';
import { IconReact } from '@/components/icons/icon-react';
import { IconReactNative } from '@/components/icons/icon-react-native';
import { IconRedis } from '@/components/icons/icon-redis';
import { IconSailsJs } from '@/components/icons/icon-sails-js';
import { IconSass } from '@/components/icons/icon-sass';
import { IconSlack } from '@/components/icons/icon-slack';
import { IconTailwind } from '@/components/icons/icon-tailwind';
import { IconTypescript } from '@/components/icons/icon-typecript';
import { IconVercel } from '@/components/icons/icon-vercel';
import { IconVite } from '@/components/icons/icon-vite';
import { IconVitest } from '@/components/icons/icon-vitest';
import { IconVue } from '@/components/icons/icon-vue';
import { IconWebpack } from '@/components/icons/icon-webpack';
import { IconWindows } from '@/components/icons/icon-windows';
import { IconYarn } from '@/components/icons/icon-yarn';

export const STACK_CATEGORIES: Array<StackCategory> = [
  {
    name: 'Backend',
    description: [''],
    slug: 'backend',
    tags: [],
    tools: [
      {
        name: 'PHP',
          icon: IconPhp,
          description: [
            'A popular server-side scripting language for backend development. As a senior developer, I use PHP to build robust APIs, automate server tasks, and maintain legacy systems. It is ideal for rapid prototyping and powering content-heavy web applications.'
          ],
        parent: 'backend',
        proficiency: 8,
        slug: 'php',
        type: 'Programming Language',
        style: { x: 426.5, y: 488.5, size: 62.5 },
      },
      {
        name: 'Laravel',
        icon: IconLaravel,
          description: [
            'A modern PHP framework for building scalable web applications. I leverage Laravel for its elegant syntax, built-in tools (ORM, migrations, queues), and rapid development of RESTful APIs and complex business logic.'
          ],
        parent: 'backend',
        proficiency: 8,
        slug: 'laravel',
        type: 'Language Framework',
        style: { x: 533, y: 570, size: 50 },
      },
      {
        name: 'Node js',
        icon: IconNodejs,
          description: [
            'A JavaScript runtime for server-side development. I use Node.js to build high-performance APIs, real-time services, and microservices, especially when I need non-blocking I/O and a unified JS stack.'
          ],
        parent: 'backend',
        proficiency: 7,
        slug: 'nodejs',
        type: 'Programming Language',
        style: { x: 344.5, y: 558.5, size: 37.5 },
      },
      {
        name: 'Adonis js',
          icon: IconAdonisJs,
          description: [
            'A full-featured Node.js MVC framework. I use AdonisJS for projects that require structure, built-in authentication, and ORM, making backend development in JavaScript more maintainable.'
          ],
        parent: 'backend',
        proficiency: 7,
        slug: 'adonisjs',
        type: 'Language Framework',
        style: { x: 413.5, y: 619.5, size: 37.5 },
      },
      {
        name: 'MySQL',
          icon: IconMysql,
          description: [
            'A widely-used relational database. I use MySQL for structured data storage, complex queries, and transactional systems where data integrity is critical.'
          ],
        parent: 'backend',
        proficiency: 9,
        slug: 'mysql',
        type: 'Database Engine',
        style: { x: 279, y: 657, size: 25 },
      },
      {
        name: 'Sails js',
          icon: IconSailsJs,
          description: [
            'A Node.js MVC framework inspired by Ruby on Rails. I use Sails.js for building data-driven APIs and real-time apps, especially when I want convention over configuration.'
          ],
        parent: 'backend',
        proficiency: 7,
        slug: 'sailsjs',
        type: 'Language Framework',
        style: { x: 348, y: 652, size: 25 },
      },
      {
        name: 'Redis',
          icon: IconRedis,
          description: [
            'An in-memory data store, often used as a cache or message broker. I use Redis to optimize performance, manage sessions, and implement pub/sub patterns in distributed systems.'
          ],
        parent: 'backend',
        proficiency: 6,
        slug: 'redis',
        type: 'Database Engine',
        style: { x: 454.5, y: 570.5, size: 17.5 },
      },
      {
        name: 'MongoDB',
          icon: IconMongodb,
          description: [
            'A NoSQL document database. I use MongoDB for flexible, schema-less data storage, rapid prototyping, and applications with unstructured or evolving data models.'
          ],
        parent: 'backend',
        proficiency: 5,
        slug: 'mongodb',
        type: 'Database Engine',
        style: { x: 283, y: 608, size: 16 },
      },
      {
        name: 'Express js',
          icon: IconExpressJs,
          description: [
            'A minimalist web framework for Node.js. I use Express.js to quickly scaffold REST APIs, middleware, and server-side logic for web and mobile backends.'
          ],
        parent: 'backend',
        proficiency: 9,
        slug: 'expressjs',
        type: 'Language Framework',
        style: { x: 320, y: 616, size: 16 },
      },
      {
        name: 'Phpunit',
          icon: IconPhpunit,
          description: [
            'A unit testing framework for PHP. I use PHPUnit to ensure code quality, automate regression testing, and maintain confidence during refactoring.'
          ],
        parent: 'backend',
        proficiency: 10,
        slug: 'phpunit',
        type: 'Software Testing',
        style: { x: 510, y: 497, size: 12 },
      },
      {
        name: 'GraphQL',
          icon: IconGraphql,
          description: [
            'A query language for APIs. I use GraphQL to provide flexible, efficient data fetching for frontend clients, especially in complex or highly interactive applications.'
          ],
        parent: 'backend',
        proficiency: 4,
        slug: 'graphql',
        type: 'API Language',
        style: { x: 471, y: 620, size: 12 },
      },
      {
        name: 'REST API',
          description: [
            'A standard architectural style for web APIs. I design and consume REST APIs to enable communication between services and clients in a predictable, scalable way.'
          ],
        parent: 'backend',
        proficiency: 10,
        slug: 'rest',
        type: 'API Language',
        style: { x: 471, y: 620, size: 12 },
      },
    ],
  },
  {
    name: 'Frontend',
    description: [''],
    slug: 'frontend',
    tags: [],
    tools: [
      {
        name: 'JavaScript',
          icon: IconJavaScript,
          description: [
            'The language of the web. I use JavaScript for building interactive UIs, client-side logic, and, with Node.js, full-stack development.'
          ],
        parent: 'frontend',
        proficiency: 8,
        slug: 'javascript',
        type: 'Programming Language',
        style: { x: 289, y: 209, size: 75 },
      },
      {
        name: 'CSS',
          icon: IconCss,
          description: [
            'The styling language for web pages. I use CSS to create responsive, visually appealing layouts and ensure cross-browser compatibility.'
          ],
        parent: 'frontend',
        proficiency: 10,
        slug: 'css',
        type: 'Programming Language',
        style: { x: 444, y: 202, size: 70 },
      },
      {
        name: 'Vue.js',
        icon: IconVue,
          description: [
            'A progressive JavaScript framework for building UIs. I use Vue.js for its simplicity, reactivity, and component-based architecture in SPAs and PWAs.'
          ],
        parent: 'frontend',
        proficiency: 9,
        slug: 'vue',
        type: 'Language Framework',
        style: { x: 402, y: 66, size: 63 },
      },
      {
        name: 'Typescript',
        icon: IconTypescript,
          description: [
            'A statically typed superset of JavaScript. I use TypeScript to catch errors early, improve code maintainability, and enable better tooling in large codebases.'
          ],
        parent: 'frontend',
        proficiency: 8,
        slug: 'typescript',
        type: 'Programming Language',
        style: { x: 295.5, y: 79.5, size: 37.5 },
      },
      {
        name: 'React',
        icon: IconReact,
          description: [
            'A popular library for building user interfaces. I use React for its component model, hooks, and ecosystem to build scalable, interactive web and mobile apps.'
          ],
        parent: 'frontend',
        proficiency: 9,
        slug: 'react',
        type: 'Language Framework',
        style: { x: 518, y: 94, size: 50 },
      },
      {
        name: 'SASS/SCSS',
        icon: IconSass,
          description: [
            'A CSS preprocessor that adds variables, nesting, and more. I use SASS/SCSS to write maintainable, modular, and DRY stylesheets.'
          ],
        parent: 'frontend',
        proficiency: 8,
        slug: 'sass',
        type: 'Programming Language',
        style: { x: 132, y: 140, size: 34 },
      },
      {
        name: 'Tailwind CSS',
        icon: IconTailwind,
          description: [
            'A utility-first CSS framework. I use Tailwind CSS to rapidly prototype and build consistent, responsive UIs with minimal custom CSS.'
          ],
        parent: 'frontend',
        proficiency: 10,
        slug: 'tailwindcss',
        type: 'Language Framework',
        style: { x: 215, y: 61, size: 34 },
      },
      {
        name: 'Nuxt JS',
        icon: IconNuxtJs,
          description: [
            'A framework for server-side rendered Vue.js apps. I use Nuxt.js for SEO-friendly SPAs, static sites, and universal apps.'
          ],
        parent: 'frontend',
        proficiency: 8,
        slug: 'nuxtjs',
        type: 'Language Framework',
        style: { x: 582, y: 186, size: 27 },
      },
      {
        name: 'Next.js',
        icon: IconNextJs,
          description: [
            'A React framework for server-side rendering and static site generation. I use Next.js for high-performance, SEO-optimized web applications.'
          ],
        parent: 'frontend',
        proficiency: 7,
        slug: 'nextjs',
        type: 'Language Framework',
        style: { x: 186, y: 176, size: 24 },
      },
      {
        name: 'Chakra UI',
        icon: IconChakraUi,
          description: [
            'A modular React component library. I use Chakra UI to build accessible, themeable UIs quickly, with a focus on developer experience.'
          ],
        parent: 'frontend',
        proficiency: 8,
        slug: 'chakra-ui',
        type: 'Language Framework',
        style: { x: 225, y: 123, size: 23 },
      },
      {
        name: 'Bootstrap CSS',
        icon: IconBootstrap,
          description: [
            'A popular CSS framework. I use Bootstrap to speed up UI development with prebuilt components and ensure responsive design.'
          ],
        parent: 'frontend',
        proficiency: 8,
        slug: 'bootstrap',
        type: 'Language Framework',
        style: { x: 316, y: 24, size: 16 },
      },
      {
        name: 'Vitest',
          icon: IconVitest,
          description: [
            'A fast unit testing framework for Vite projects. I use Vitest to write and run tests efficiently in modern frontend stacks.'
          ],
        parent: 'frontend',
        proficiency: 7,
        slug: 'vitest',
        type: 'Software Testing',
        style: { x: 575, y: 138, size: 16 },
      },
      {
        name: 'Jest',
          icon: IconJest,
          description: [
            'A JavaScript testing framework. I use Jest for unit and integration testing, especially in React and TypeScript projects.'
          ],
        parent: 'frontend',
        proficiency: 7,
        slug: 'jest',
        type: 'Software Testing',
        style: { x: 535, y: 173, size: 16 },
      },
      {
        name: 'JQuery',
          icon: IconJquery,
          description: [
            'A classic JavaScript library for DOM manipulation. I use jQuery for legacy projects or when I need quick, cross-browser scripting.'
          ],
        parent: 'frontend',
        proficiency: 10,
        slug: 'jquery',
        type: 'Code Library',
        style: { x: 351, y: 130, size: 12 },
      },
      {
        name: 'React Native',
          icon: IconReactNative,
          description: [
            'A framework for building native mobile apps with React. I use React Native to deliver cross-platform mobile experiences using a single codebase.'
          ],
        parent: 'frontend',
        proficiency: 6,
        slug: 'react-native',
        type: 'Language Framework',
        style: { x: 174, y: 106, size: 12 },
      },
    ],
  },
  {
    name: 'Cloud & OS',
    description: [''],
    slug: 'cloud',
    tags: [],
    tools: [
      {
        name: 'Github',
          icon: IconGithub,
          description: [
            'A platform for hosting and collaborating on code. I use GitHub for version control, code reviews, CI/CD, and open-source contributions.'
          ],
        parent: 'cloud',
        proficiency: 8,
        slug: 'github',
        type: 'Code Repository',
        style: { x: 78, y: 301, size: 60 },
      },
      {
        name: 'Vercel',
          icon: IconVercel,
          description: [
            'A cloud platform for frontend deployment. I use Vercel to deploy Next.js and static sites with zero-config, preview deployments, and global CDN.'
          ],
        parent: 'cloud',
        proficiency: 8,
        slug: 'vercel',
        type: 'cloud',
        style: { x: 172, y: 400, size: 48 },
      },
      {
        name: 'Gitlab',
          icon: IconGitlab,
          description: [
            'A DevOps platform for code hosting and CI/CD. I use GitLab for private repos, pipelines, and integrated project management.'
          ],
        parent: 'cloud',
        proficiency: 7,
        slug: 'gitlab',
        type: 'Code Repository',
        style: { x: 36, y: 398, size: 36 },
      },
      {
        name: 'Linux',
          icon: IconLinux,
          description: [
            'An open-source operating system. I use Linux for server hosting, development environments, and automation scripts.'
          ],
        parent: 'cloud',
        proficiency: 7,
        slug: 'linux',
        type: 'Operating system',
        style: { x: 94, y: 435, size: 27 },
      },
      {
        name: 'Apache',
          icon: IconApache,
          description: [
            'A widely-used HTTP server. I use Apache to serve web content, configure virtual hosts, and manage SSL certificates.'
          ],
        parent: 'cloud',
        proficiency: 7,
        slug: 'apache',
        type: 'HTTP Server',
        style: { x: 210, y: 324, size: 24 },
      },
      {
        name: 'AWS',
          icon: IconAws,
          description: [
            'Amazon Web Services, a cloud platform. I use AWS for scalable infrastructure, managed databases, and cloud-native deployments.'
          ],
        parent: 'cloud',
        proficiency: 5,
        slug: 'aws',
        type: 'cloud',
        style: { x: 63, y: 214, size: 21 },
      },
      {
        name: 'Netlify',
          icon: IconNetlify,
          description: [
            'A platform for deploying static sites and JAMstack apps. I use Netlify for quick deployments, serverless functions, and instant rollbacks.'
          ],
        parent: 'cloud',
        proficiency: 5,
        slug: 'netlify',
        type: 'cloud',
        style: { x: 148, y: 249, size: 21 },
      },
      {
        name: 'Nginx',
          icon: IconNginx,
          description: [
            'A high-performance web server and reverse proxy. I use Nginx for load balancing, SSL termination, and serving static assets.'
          ],
        parent: 'cloud',
        proficiency: 7,
        slug: 'nginx',
        type: 'HTTP Server',
        style: { x: 47, y: 457, size: 20 },
      },
      {
        name: 'Docker',
        icon: IconDocker,
          description: [
            'A containerization platform. I use Docker to package, deploy, and run applications consistently across environments.'
          ],
        parent: 'cloud',
        proficiency: 5,
        slug: 'docker',
        type: 'Code Repository',
        style: { x: 161, y: 311, size: 18 },
      },
      {
        name: 'Digital Ocean',
          icon: IconDigitalOcean,
          description: [
            'A cloud provider for developers. I use Digital Ocean for affordable VPS hosting, managed databases, and scalable infrastructure.'
          ],
        parent: 'cloud',
        proficiency: 6,
        slug: 'digitalocean',
        type: 'cloud',
        style: { x: 94, y: 386, size: 16 },
      },
      {
        name: 'Windows',
          icon: IconWindows,
          description: [
            'A widely-used operating system. I use Windows for cross-platform testing, desktop development, and compatibility checks.'
          ],
        parent: 'cloud',
        proficiency: 7,
        slug: 'windows',
        type: 'Operating system',
        style: { x: 102, y: 226, size: 12 },
      },
      {
        name: 'Mac OS',
          icon: IconMacos,
          description: [
            'Apple’s desktop operating system. I use macOS for development, especially for iOS apps and a Unix-like environment.'
          ],
        parent: 'cloud',
        proficiency: 8,
        slug: 'macos',
        type: 'Operating system',
        style: { x: 178, y: 276, size: 12 },
      },
    ],
  },
  {
    name: 'Product Design & Management',
    description: [''],
    slug: 'design',
    tags: [],
    tools: [
      {
        name: 'Figma',
        icon: IconFigma,
          description: [
            'A collaborative design tool. I use Figma for UI/UX design, prototyping, and sharing design systems with teams.'
          ],
        parent: 'design',
        proficiency: 9,
        slug: 'figma',
        type: 'Design & Prototyping',
        style: { x: 141, y: 562, size: 50 },
      },
      {
        name: 'Jira',
          icon: IconJira,
          description: [
            'A project management tool. I use Jira to track issues, plan sprints, and manage agile workflows.'
          ],
        parent: 'design',
        proficiency: 7,
        slug: 'jira',
        type: 'Product Management Tool',
        style: { x: 196, y: 628, size: 30 },
      },
      {
        name: 'Slack',
          icon: IconSlack,
          description: [
            'A team communication platform. I use Slack for real-time collaboration, notifications, and integrations with development tools.'
          ],
        parent: 'design',
        proficiency: 10,
        slug: 'slack',
        type: 'Communication',
        style: { x: 161, y: 489, size: 20 },
      },
      {
        name: 'Asana',
          icon: IconAsana,
          description: [
            'A work management platform. I use Asana to organize tasks, set deadlines, and coordinate with cross-functional teams.'
          ],
        parent: 'design',
        proficiency: 6,
        slug: 'asana',
        type: 'Product Management Tool',
        style: { x: 225, y: 565, size: 20 },
      },
      {
        name: 'Whimsical',
          description: [
            'A visual workspace for flowcharts, wireframes, and mind maps. I use Whimsical to brainstorm, diagram systems, and communicate ideas visually.'
          ],
        parent: 'design',
        proficiency: 8,
        slug: 'whimsical',
        type: 'Design & Prototyping',
        style: { x: 205, y: 517, size: 15 },
      },
    ],
  },
  {
    name: 'Package & Dependency Management',
    description: [''],
    slug: 'package_management',
    tags: [],
    tools: [
      {
        name: 'NPM',
        icon: IconNpm,
          description: [
            'The default package manager for Node.js. I use NPM to manage dependencies, publish packages, and automate scripts in JavaScript projects.'
          ],
        parent: 'package_management',
        proficiency: 10,
        slug: 'npm',
        type: 'Dependency Management',
        style: { x: 544, y: 349, size: 60 },
      },
      {
        name: 'Git',
        icon: IconGit,
          description: [
            'A distributed version control system. I use Git to track changes, collaborate with teams, and manage code history.'
          ],
        parent: 'package_management',
        proficiency: 8,
        slug: 'git',
        type: 'Version Control',
        style: { x: 648, y: 301, size: 49 },
      },
      {
        name: 'Vite',
        icon: IconVite,
          description: [
            'A fast frontend build tool. I use Vite for instant hot module replacement and rapid development in modern JS frameworks.'
          ],
        parent: 'package_management',
        proficiency: 8,
        slug: 'vite',
        type: 'Asset Bundler',
        style: { x: 652, y: 420, size: 36 },
      },
      {
        name: 'PNPM',
          icon: IconPnpm,
          description: [
            'A performant package manager for Node.js. I use PNPM for efficient dependency management and monorepo support.'
          ],
        parent: 'package_management',
        proficiency: 10,
        slug: 'pnpm',
        type: 'Dependency Management',
        style: { x: 580, y: 441, size: 26 },
      },
      {
        name: 'Webpack',
          icon: IconWebpack,
          description: [
            'A powerful module bundler. I use Webpack to bundle assets, optimize builds, and enable advanced frontend workflows.'
          ],
        parent: 'package_management',
        proficiency: 7,
        slug: 'webpack',
        type: 'Asset Bundler',
        style: { x: 623, y: 370, size: 16 },
      },
      {
        name: 'Yarn',
        icon: IconYarn,
          description: [
            'A fast, reliable package manager. I use Yarn for dependency management, workspaces, and deterministic installs.'
          ],
        parent: 'package_management',
        proficiency: 7,
        slug: 'yarn',
        type: 'Dependency Management',
        style: { x: 667, y: 365, size: 12 },
      },
      {
        name: 'Composer',
        icon: IconComposer,
          description: [
            'A dependency manager for PHP. I use Composer to manage libraries, autoloading, and package versioning in PHP projects.'
          ],
        parent: 'package_management',
        proficiency: 8,
        slug: 'composer',
        type: 'Dependency Management',
        style: { x: 583, y: 280, size: 12 },
      },
    ],
  },
];

export const ALL_ITEMS = STACK_CATEGORIES.flatMap((category) => category.tools);
