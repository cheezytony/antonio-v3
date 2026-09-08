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
];

export const getWritingEntry = (slug: string): WritingEntry | undefined =>
  WRITING.find((entry) => entry.slug === slug);
