export interface Entity {
  id: number
  name: string
  shortName: string
  country: string
  countryCode: string
  nextBoard: string
  nextBoardDate: Date
  completion: number
}

export interface ActionItem {
  id: number
  entityName: string
  entityTag: string
  tagColor: string
  title: string
  description: string
  actionLabel: string
}

export interface ChatMessage {
  id: number
  role: 'user' | 'assistant'
  content: string
}

export const ENTITIES: Entity[] = [
  {
    id: 1,
    name: 'Meridian Capital Holdings Ltd',
    shortName: 'Meridian Capital',
    country: 'United Kingdom',
    countryCode: 'UK',
    nextBoard: '14 Mar 2026',
    nextBoardDate: new Date('2026-03-14'),
    completion: 72,
  },
  {
    id: 2,
    name: 'Apex Ventures GmbH',
    shortName: 'Apex Ventures',
    country: 'Germany',
    countryCode: 'DE',
    nextBoard: '18 Mar 2026',
    nextBoardDate: new Date('2026-03-18'),
    completion: 45,
  },
  {
    id: 3,
    name: 'Horizon Digital S.A.',
    shortName: 'Horizon Digital',
    country: 'France',
    countryCode: 'FR',
    nextBoard: '11 Mar 2026',
    nextBoardDate: new Date('2026-03-11'),
    completion: 88,
  },
  {
    id: 4,
    name: 'Nordic Solutions AB',
    shortName: 'Nordic Solutions',
    country: 'Sweden',
    countryCode: 'SE',
    nextBoard: '25 Mar 2026',
    nextBoardDate: new Date('2026-03-25'),
    completion: 31,
  },
  {
    id: 5,
    name: 'Pacific Rim Operations Pte Ltd',
    shortName: 'Pacific Rim Ops',
    country: 'Singapore',
    countryCode: 'SG',
    nextBoard: '7 Mar 2026',
    nextBoardDate: new Date('2026-03-07'),
    completion: 60,
  },
  {
    id: 6,
    name: 'Atlantic Resources Inc',
    shortName: 'Atlantic Resources',
    country: 'United States',
    countryCode: 'US',
    nextBoard: '20 Mar 2026',
    nextBoardDate: new Date('2026-03-20'),
    completion: 95,
  },
  {
    id: 7,
    name: 'Iberian Holdings S.L.',
    shortName: 'Iberian Holdings',
    country: 'Spain',
    countryCode: 'ES',
    nextBoard: '28 Mar 2026',
    nextBoardDate: new Date('2026-03-28'),
    completion: 18,
  },
  {
    id: 8,
    name: 'Eastern Markets Ltd',
    shortName: 'Eastern Markets',
    country: 'UAE',
    countryCode: 'AE',
    nextBoard: '4 Apr 2026',
    nextBoardDate: new Date('2026-04-04'),
    completion: 55,
  },
]

export const ACTION_ITEMS: ActionItem[] = [
  {
    id: 1,
    entityName: 'Apex Ventures GmbH',
    entityTag: 'APEX VENTURES',
    tagColor: 'bg-amber-700',
    title: 'GDPR Sign-off Required',
    description: 'EU data processing addendum requires legal sign-off before board pack can be finalised.',
    actionLabel: 'Review Item',
  },
  {
    id: 2,
    entityName: 'Meridian Capital Holdings Ltd',
    entityTag: 'MERIDIAN CAPITAL',
    tagColor: 'bg-blue-700',
    title: 'CEO Report Unassigned',
    description: 'Board pack section 3.2 has no owner. Meeting in 15 days.',
    actionLabel: 'Assign Owner',
  },
  {
    id: 3,
    entityName: 'Pacific Rim Operations Pte Ltd',
    entityTag: 'PACIFIC RIM',
    tagColor: 'bg-teal-700',
    title: 'Q4 Financials Not Received',
    description: 'Q4 Financial Statements not received from Finance. Pack cannot progress to review without them.',
    actionLabel: 'Notify Finance',
  },
  {
    id: 4,
    entityName: 'Nordic Solutions AB',
    entityTag: 'NORDIC SOLUTIONS',
    tagColor: 'bg-indigo-700',
    title: 'Resolution Awaiting Signatures',
    description: 'Capital restructuring resolution approved in December — 3 of 5 director e-signatures complete.',
    actionLabel: 'Send for Signature',
  },
]

export const PROMPT_STARTERS: string[] = [
  'Plan quarterly meetings for all entities',
  'Create board pack',
  'Draft minutes',
  'Add agenda item across all entities',
]

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    role: 'assistant',
    content: 'Ready. 6 of 8 board packs are in progress for Q1 2026. Four items need your attention before I can proceed.',
  },
]
