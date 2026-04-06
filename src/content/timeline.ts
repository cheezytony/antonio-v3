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

export const TIMELINE: Array<Item> = [
  {
    title: 'The Resurrection of Jesus Christ',
    date: 'April 5, 2026',
    description: [
      'On the third day after His crucifixion, Jesus of Nazareth rose from the dead — an event that would forever divide history into before and after. Early on the first day of the week, Mary Magdalene and the other women came to the tomb and found the stone rolled away, the burial cloths neatly folded, and an angel who proclaimed: "He is not here; He has risen, just as He said." (Matthew 28:6)',
      'The risen Christ appeared first to Mary Magdalene in the garden outside the tomb, then to the disciples on the road to Emmaus, then to the eleven apostles gathered behind locked doors, and finally to more than five hundred witnesses before His ascension into heaven. Each appearance shattered grief and replaced it with a joy that death itself could not extinguish.',
      'The resurrection is the cornerstone of Christian faith. It vindicated every claim Jesus made about Himself, conquered sin and death on behalf of all humanity, and inaugurated a new creation. As the Apostle Paul wrote, "If Christ has not been raised, your faith is futile… But Christ has indeed been raised from the dead, the firstfruits of those who have fallen asleep." (1 Corinthians 15:17, 20)',
    ],
    images: [
      {
        colSpan: 2,
        rowSpan: 2,
        src: '/images/resurrection-dawn.jpg',
        alt: 'The Empty Tomb at dawn — a golden light radiates from the open sepulchre on the morning of the resurrection',
      },
      {
        colSpan: 1,
        rowSpan: 2,
        src: '/images/resurrection-angels.jpg',
        alt: 'He Is Risen — heavenly light and the angelic announcement of the resurrection',
      },
      {
        colSpan: 1,
        rowSpan: 1,
        src: '/images/resurrection-garden.jpg',
        alt: 'Noli Me Tangere — the risen Christ appears to Mary Magdalene in the garden',
      },
      {
        colSpan: 1,
        rowSpan: 1,
        src: '/images/resurrection-disciples.jpg',
        alt: 'The Road to Emmaus — two disciples recognize the risen Christ at the breaking of bread',
      },
    ],
  },
  {
    title: 'Easter Monday',
    date: 'April 6, 2026',
    description: [
      'Easter Monday marks the day after the Resurrection Sunday, continuing the joyful celebration of Christ\'s triumph over death. In many Christian traditions, this day is observed as a public holiday, with communities gathering for fellowship, reflection, and festivity in the wake of the holiest weekend of the year.',
      'On this day, the disciples were still reeling from the wonder of the empty tomb and the first resurrection appearances. The risen Christ continued to manifest Himself to His followers — most famously to the two disciples on the road to Emmaus, whose hearts burned within them as He walked with them and opened the Scriptures, before being recognised at the breaking of bread. (Luke 24:13–35)',
    ],
    images: [],
  },
];
