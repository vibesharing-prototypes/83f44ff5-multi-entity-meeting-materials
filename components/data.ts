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

export interface EditSuggestion {
  id: number
  entities: Array<{ tag: string; tagColor: string }>
  sourceType: 'regulation' | 'market' | 'source-material'
  sourceLabel: string
  title: string
  reason: string
  suggestedPrompt: string
}

export const EDIT_SUGGESTIONS: EditSuggestion[] = [
  {
    id: 1,
    entities: [{ tag: 'APEX VENTURES', tagColor: 'bg-amber-700' }],
    sourceType: 'regulation',
    sourceLabel: 'EU AI Act',
    title: 'Update AI Act compliance deadline in Risk section',
    reason: 'EU AI Act enforcement guidelines revised 24 Feb 2026 — key deadline shifted from Q2 to Q3 2026.',
    suggestedPrompt: 'Update the Risk & Compliance section for Apex Ventures to reflect the revised EU AI Act enforcement deadline (Q3 2026) and adjust the remediation budget timeline accordingly.',
  },
  {
    id: 2,
    entities: [{ tag: 'MERIDIAN CAPITAL', tagColor: 'bg-blue-700' }],
    sourceType: 'regulation',
    sourceLabel: 'FCA Guidance',
    title: 'Reference updated FCA Consumer Duty guidance in CEO Report',
    reason: 'FCA published updated Consumer Duty implementation guidance on 1 Mar 2026, affecting all UK authorised firms.',
    suggestedPrompt: "Add a paragraph to Meridian Capital's CEO Report referencing the FCA's updated Consumer Duty guidance (Mar 2026) and the entity's current compliance posture.",
  },
  {
    id: 3,
    entities: [{ tag: 'HORIZON DIGITAL', tagColor: 'bg-violet-700' }],
    sourceType: 'market',
    sourceLabel: 'ECB Rate Cut',
    title: 'Revise FX hedging commentary — ECB rate now 2.90%',
    reason: 'ECB cut rates 25bps to 2.90% on 6 Mar 2026. Pack currently references the superseded rate of 3.15%.',
    suggestedPrompt: "Update Horizon Digital's Q4 Financial Statements to reflect the ECB rate cut to 2.90% (6 Mar 2026) and revise all FX hedging commentary to align with the current rate environment.",
  },
  {
    id: 4,
    entities: [{ tag: 'ATLANTIC RESOURCES', tagColor: 'bg-emerald-700' }],
    sourceType: 'source-material',
    sourceLabel: 'Auditor Revision',
    title: 'Reconcile EBITDA — PwC revised Q4 management accounts',
    reason: 'PwC submitted revised management accounts on 28 Feb 2026. EBITDA now £2.6m; pack currently states £2.8m.',
    suggestedPrompt: "Reconcile the Q4 Financial Statements for Atlantic Resources with PwC's revised management accounts (28 Feb 2026): update EBITDA from £2.8m to £2.6m and recalculate the EBITDA margin.",
  },
  {
    id: 5,
    entities: [
      { tag: 'APEX VENTURES', tagColor: 'bg-amber-700' },
      { tag: 'HORIZON DIGITAL', tagColor: 'bg-violet-700' },
      { tag: 'NORDIC SOLUTIONS', tagColor: 'bg-indigo-700' },
      { tag: 'IBERIAN HOLDINGS', tagColor: 'bg-orange-700' },
    ],
    sourceType: 'regulation',
    sourceLabel: 'CSRD',
    title: 'Add mandatory ESG disclosure section to all EU entity board packs',
    reason: 'CSRD mandatory reporting applies from Jan 2026 for qualifying EU entities. No ESG disclosure section exists in any of the 4 affected packs.',
    suggestedPrompt: 'Add an ESG disclosure section to board packs for Apex Ventures, Horizon Digital, Nordic Solutions, and Iberian Holdings, covering scope 1 & 2 emissions, social metrics, and board oversight of sustainability strategy as required under CSRD.',
  },
]

export const PROMPT_STARTERS: string[] = [
  'Which packs are at risk this quarter?',
  'Create board pack',
  'Show all outstanding director signatures',
  'Draft a circular resolution across entities',
]

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    role: 'assistant',
    content: 'Q1 2026 pack status: 6 of 8 entities are in progress. Most urgent — Pacific Rim Ops meets on 7 March and Q4 Financials are still missing from Finance. Atlantic Resources is nearly done, pending chair sign-off only. Four items need your review before I can proceed.',
  },
]
