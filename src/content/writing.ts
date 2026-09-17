export interface WritingBlock {
  heading?: string;
  paragraphs?: Array<string>;
  pullQuote?: string;
  callout?: {
    label: string;
    body: string;
  };
  list?: Array<{ term: string; body: string }>;
}

export interface WritingEntry {
  slug: string;
  title: string;
  dek: string;
  date: string;
  readingTime: string;
  tags: Array<string>;
  blocks: Array<WritingBlock>;
}

export const WRITING: Array<WritingEntry> = [
  {
    slug: 'two-balances-and-a-log',
    title: 'Two balances and a log',
    dek: 'Notes on the ledger I designed for CredPal, a Nigerian consumer credit platform serving hundreds of thousands of users. Almost every hard problem in it lived in the gap between the money a customer had spent and the money the provider had actually moved.',
    date: 'September 2026',
    readingTime: '9 min read',
    tags: ['Ledgers', 'Payments', 'Distributed systems', 'Fintech'],
    blocks: [
      {
        heading: 'The problem',
        paragraphs: [
          'We lent money to Nigerians who could not get a card from a bank. Credit, buy-now-pay-later, savings, bill payments, merchant settlement. All of it eventually resolved to one question: how much does this person actually have right now?',
          'That question is harder than it sounds, because almost nothing about money in this system happened inside it. A card authorisation succeeded at a processor. A bank transfer landed hours later. A disbursement was accepted, then quietly failed. A webhook told us about it, or told us twice, or never arrived.',
          "So the ledger's job was not to record what happened. It was to hold a defensible position on what was true, at every moment, including the moments when the outside world had gone quiet and we did not yet know.",
        ],
      },
      {
        heading: 'Every account has two balances',
        paragraphs: [
          'Two tables. Accounts, and transactions. The decisions worth writing down are all in what those two carried.',
          'Each account holds an available balance and a settled balance. The available balance moves the moment a debit is authorised, so a customer cannot spend the same money twice while a payment is in flight. The settled balance waits for the provider to confirm the money actually moved. Between those two numbers sits everything that is still in the air.',
          'This is the same shape a bank shows you as "available" versus "current", and for the same reason: a customer must not be able to spend money that is already committed, but you must not claim money has moved when it has not.',
        ],
      },
      {
        heading: 'Paired legs, and a log that carries its own proof',
        paragraphs: [
          'A customer paying a merchant writes two rows, a debit against one account and a credit against the other, linked by a shared reference so neither can exist without its counterpart.',
          'Each row also stores the balance before the movement and the balance after it. That one decision is what makes the whole thing provable. A balance sitting in a column is a claim. A balance you can replay from the log and arrive at independently is a fact. When the two disagree you know immediately, and you know where.',
          'Nothing in the log is ever edited. A mistake is corrected by writing a new movement that reverses it, so the history shows both what we got wrong and what we did about it.',
        ],
        pullQuote:
          'A balance in a column is a claim. A balance you can replay is a fact.',
      },
      {
        heading: 'Credit lines reuse the same machinery',
        paragraphs: [
          'When we built the credit products, an account additionally carried its limit, the amount drawn and the amount available. The mechanics did not change. A drawdown is a debit, a repayment is a credit, and the available figure is a derived view of the same underlying movements. A credit line and a wallet behaved consistently because they were the same object with different constraints.',
        ],
      },
      {
        heading: 'Three things I turned down',
        list: [
          {
            term: 'Correcting mistakes by editing rows',
            body: 'The tempting version: an agent finds a wrong balance, fixes the number, everyone moves on. But you have now destroyed the only evidence of what the system believed and when. Disputes become unanswerable, and worse, you can no longer tell a bug from a correction. Reversing entries are more work and they are the whole point.',
          },
          {
            term: 'One flat transactions table with no accounts',
            body: 'A log of everything that happened, derive whatever you need later. It works until the first time two products disagree about what an account even is. Making accounts a real thing, with balances attached and movements that reference them, is what let credit, savings, bill payments and merchant settlement share one source of truth instead of four.',
          },
          {
            term: "Treating the provider's records as the source of truth",
            body: 'The seductive one, because the provider genuinely does know whether the money moved and we do not. But their view arrives on their schedule, not ours, and it does not include intent. If a customer taps pay and the processor has not answered yet, the provider has no opinion and we still have to have one. Keeping our own record and reconciling against theirs meant we could always answer, and always know when our answer was provisional.',
          },
        ],
      },
      {
        heading: 'Three ways it broke, and what each one bought',
        paragraphs: [
          'None of these are hypothetical. Each one taught the system a defence it did not have on day one.',
        ],
      },
      {
        heading: 'The webhook that arrived twice',
        paragraphs: [
          'Providers retry. Networks duplicate. A callback we had already processed came in again, and the second delivery moved the money a second time. The naive fix is to check whether you have seen this event before, which works right up until two copies arrive close enough together that both checks pass before either writes.',
        ],
        callout: {
          label: 'What it bought',
          body: "Idempotency as a property of the write, not a check before it. The provider's reference became a uniqueness constraint on the movement itself, so the second delivery could not create a row no matter how the timing fell. A duplicate callback became a no-op the database enforced, rather than a race the application hoped to win.",
        },
      },
      {
        heading: 'Two debits racing on one balance',
        paragraphs: [
          'The classic. Two requests read the same available balance, both find it sufficient, both proceed, and the account spends money it did not have. On a lending platform that is not an accounting inconvenience. It is unsecured credit you never agreed to extend.',
        ],
        callout: {
          label: 'What it bought',
          body: 'Serialisation on the account for the duration of a movement, so the balance check and the write happen as one indivisible step and the second request evaluates against a balance that already reflects the first. Slower, and correct. The lesson generalises: any check-then-act on money is a bug unless something makes it atomic.',
        },
      },
      {
        heading: 'The callback that never came',
        paragraphs: [
          'The quiet one, and the most dangerous, because nothing fails. The money moved at the provider, no webhook ever arrived, and the settled balance simply sat there being wrong. No error, no alert, no angry customer until much later. This is the failure that justifies the entire two-balance design, because the gap between available and settled is exactly where such a transaction is stranded.',
        ],
        callout: {
          label: 'What it bought',
          body: 'Reconciliation as a scheduled, first-class part of the system rather than a script someone runs after an incident. Anything in flight past a threshold gets actively queried against the provider rather than waited on, and the ledger is reconciled against their records on a cycle.',
        },
        pullQuote:
          'Webhooks are an optimisation. Reconciliation is the guarantee.',
      },
      {
        heading: 'What I would do differently',
        list: [
          {
            term: 'Give external money a counterparty',
            body: 'Movements between two accounts we owned wrote paired legs. Money entering from outside, a bank transfer or a card funding, wrote a single credit against the customer with nothing on the other side. That was a deliberate simplification and I think it was the wrong one. The cost is that the system as a whole does not sum to zero, so you lose the strongest invariant a ledger can have: proving the books balance by adding them up. The fix is not complicated. Internal accounts representing the provider float and the settlement position, so external money is a transfer from an account you control rather than value appearing from nowhere.',
          },
          {
            term: 'Treat the stored balance as a cache, explicitly',
            body: 'The balance columns are fast and reads vastly outnumber writes, so I would keep them. But they were treated as authoritative when the append-only log is what is actually authoritative. I would make that relationship explicit in the design rather than implicit in the discipline: a continuously running proof that replays the log and asserts the column agrees, alerting on divergence rather than waiting for reconciliation or a customer to surface it.',
          },
          {
            term: 'Write the invariants down as tests first',
            body: 'The rules that mattered were all statable in a sentence. A movement never leaves an account below zero unless it is a credit line within its limit. Paired legs exist together or not at all. The log replays to the stored balance. Those should have been executable properties from day one, run against generated sequences of movements, rather than knowledge living in the heads of whoever had been there longest.',
          },
        ],
      },
      {
        heading: 'What I would tell someone starting one',
        paragraphs: [
          'The ledger is not the hard part. The entry model is a few hundred lines and a constraint. The hard part is that you are keeping books about a world you do not control, which will tell you things late, twice, or not at all.',
          'Everything that turned out to matter, two balances instead of one, idempotency enforced by the database, serialised writes, reconciliation as a guarantee rather than a cleanup, is a defence against that world rather than a feature of accounting. Build for the silence, not for the happy path.',
        ],
      },
    ],
  },
  {
    slug: 'shipping-browser-shortcuts',
    title: 'Shipping Browser Shortcuts',
    dek: 'I set out to build a real, multi-framework shortcuts library, not a side hook. I wrote the React core myself, then used Claude Code to take it to six frameworks fast, including the bugs it found in its own work and the npm publishing gauntlet that followed.',
    date: 'September 2026',
    readingTime: '7 min read',
    tags: ['Open source', 'Frontend', 'AI-assisted engineering', 'npm'],
    blocks: [
      {
        paragraphs: [
          'Full disclosure, right up top: I wrote the original React hook myself, by hand, no assistance. Everything past that, turning it into a proper package, generalising it to five more frameworks, writing the test suite, and hunting down the bugs below, was done with Claude Code. I am not burying that in a footnote. It is the actual subject of this post.',
        ],
      },
      {
        heading: 'Built big on purpose',
        paragraphs: [
          'This did not start as a weekend hack that accidentally grew legs. I sat down wanting to build a real shortcuts library, the kind of thing that could declare keyboard, mouse, and wheel shortcuts as plain strings, things like "CTRL+SHIFT+F", "CMD+Z", "DOUBLE_LEFT_BUTTON", and wire them up to handlers without a single hand-rolled event listener anywhere in your app. I built the React core myself, from scratch. That part was always going to be React-only in my head, at first, a solid foundation before anything else.',
          '"Something big" was the goal from day one, not an afterthought, and a shortcuts library that only works in React is not big, it is a hook with a README. So rather than spend weeks personally relearning the lifecycle quirks of five frameworks I do not use day to day, I brought in Claude Code and pointed it at the goal directly: take this React implementation and turn it into a real, multi-framework package. Quickly. What came back, and how fast it came back, is the actual subject of this post.',
        ],
      },
      {
        heading: 'One core, six costumes',
        paragraphs: [
          'The instinct when you want to support more frameworks is to go rewrite the library six times. Claude Code resisted that, thankfully, since six slightly different implementations means six slightly different bugs, forever. Instead it pulled the entire event-listening logic out of my original hook, the part that listens on the window, normalises a keyboard event into a string like "CTRL+SHIFT+F", and dispatches it to listeners, into a plain class with no framework opinions at all.',
          'Every framework adapter is now that class wearing a costume appropriate to its house party. React kept my original context provider and hook, rebuilt on the shared core. Vue got a plugin and a composable. Svelte got a setup function plus a hook that reads its own context. Solid got a provider built on its own context primitive. Angular got an injectable singleton service with destroy-ref powered cleanup. Preact got, and I want you to sit with how funny this is, the exact same code as React, because its hooks API is basically a very polite tribute act.',
        ],
      },
      {
        heading: 'The bugs were the fun part',
        paragraphs: [
          'Claude Code wrote a test suite that exercises the core and all six adapters: mount, fire the shortcut, unmount, confirm it stopped firing. Thirty two tests. Along the way that suite turned up two bugs in its own freshly written code, which it then diagnosed and fixed without me touching a line. Watching an AI catch and root cause its own bugs is a strange kind of satisfying, like watching someone proofread their own essay out loud and actually catch the typos.',
        ],
        list: [
          {
            term: 'Solid cleaned up a cleanup function that did not exist',
            body: 'The Solid provider called its cleanup hook to remove event listeners on unmount. It compiled fine, it ran fine, it just never actually cleaned up, no error most of the time, just a listener that outlived the component that created it. The cause: the test environment loaded the framework and its DOM renderer as two separate module instances, each with its own private copy of an internal ownership-tracking variable, so the cleanup registered against one copy while disposal tore down the other. Two universes, politely ignoring each other. The fix, since these components render no real DOM, was to stop going through the DOM renderer in tests entirely and drive everything through the framework core directly: one module, one owner, one universe.',
          },
          {
            term: "Angular's tests demanded a hazing ritual",
            body: 'To test one injectable class, it needed the change detection engine, the JIT compiler, a dynamic testing platform, an explicit test-environment initialisation call, and a fight with the build tool over a brand new decorator transform before any of it would even parse. All of it went in, one dependency at a time, in the order the error messages demanded them. Angular testing is basically a boss fight with dependency injection, and I mean that as a compliment.',
          },
        ],
        pullQuote:
          'If your test suite does not surprise you at least once, you did not test hard enough, and it does not matter who, or what, wrote the tests.',
      },
      {
        heading: 'Publishing: the real boss fight',
        paragraphs: [
          'Writing six framework adapters was, weirdly, the calm part of this project. The final boss was the npm publish command.',
        ],
        list: [
          {
            term: 'Round one',
            body: 'A flat permissions error demanding two-factor authentication or a token with a bypass flag enabled. Fine, I made a token with bypass explicitly enabled. Still failed.',
          },
          {
            term: 'Round two',
            body: 'Turned out the token I had carefully configured in the project was being silently ignored, because the package lives inside a workspace and npm refuses to read a workspace member’s own local config for auth. The token actually being used was a stale one sitting in my global config, created before I had ever heard the words "bypass two-factor".',
          },
          {
            term: 'Round three',
            body: 'Fixed the global token, got a brand new error: a not-found response on a package name that definitely existed. The new token had been scoped to the wrong account context during setup. Once that was sorted, the actual publish took about four seconds. The CLI does not care how much of an emotional journey you just had.',
          },
        ],
      },
      {
        heading: 'If you are staring at your own single-framework library',
        paragraphs: [
          'Generalising a library across frameworks is genuinely more approachable than it looks from the outside, and it is a legitimately good use of an AI pair. The pattern of one core with thin adapters is well established, the failure modes are well documented across enough issues to be learnable, and the tests catch you the moment you drift. You do not need a grand unifying abstraction, you need one honest class that does the actual work, and the discipline to keep every adapter dumb, just lifecycle glue, nothing clever.',
          'And write the tests, whoever is writing the code. Not because tests are virtuous, but because they are the fastest way to find out where the mental model of how a framework works is quietly wrong. Both bugs above were a gap between what was assumed and what was actually true, and they only surfaced because a test insisted on checking.',
          'I wrote the React hook, Claude Code wrote the rest, and I am comfortable putting my name on both halves. It is live now as browser-shortcuts on npm, MIT licensed, with adapters for React, Preact, Vue, Svelte, Solid, and Angular.',
        ],
      },
      {
        heading: 'More of what I have shipped',
        paragraphs: [
          'browser-shortcuts is not the first thing I have put on npm. If any of this was useful, vue3-form, vue3-authentication, bootstrap-vue-datatable and storagedotjs are on there too, and worth a search if you work in Vue.',
        ],
      },
    ],
  },
];

export const getWritingEntry = (slug: string): WritingEntry | undefined =>
  WRITING.find((entry) => entry.slug === slug);
