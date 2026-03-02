'use client'

import { useState } from 'react'
import Link from 'next/link'
import { type Entity } from '@/components/data'
import EntityLogo from '@/components/EntityLogo'
import { SECTIONS, type SectionType, type Section } from '@/components/sections'

type SectionStatus = 'complete' | 'in-progress' | 'pending'

function getSectionStatuses(completion: number): SectionStatus[] {
  const completedCount = Math.floor((completion / 100) * SECTIONS.length)
  return SECTIONS.map((_, i) => {
    if (i < completedCount) return 'complete'
    if (i === completedCount) return 'in-progress'
    return 'pending'
  })
}

function StatusBadge({ status }: { status: SectionStatus }) {
  if (status === 'complete') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
        <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 6l3 3 5-5" />
        </svg>
        Complete
      </span>
    )
  }
  if (status === 'in-progress') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        In progress
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
      Pending
    </span>
  )
}

// ─── Thumbnail mini-previews ────────────────────────────────────────────────

function MiniPreview({ type, faded }: { type: SectionType; faded: boolean }) {
  const bar = (w: string, h = 'h-1', dark = false) => (
    <div className={`${h} ${w} rounded-sm ${faded ? 'bg-slate-100' : dark ? 'bg-slate-300' : 'bg-slate-200'}`} />
  )
  const sep = () => <div className={`h-px w-full ${faded ? 'bg-slate-100' : 'bg-slate-200'}`} />

  switch (type) {
    case 'cover':
      return (
        <div className="flex flex-col items-center gap-1 py-1">
          {bar('w-4/5', 'h-1.5', true)}
          {bar('w-3/5')}
          <div className="h-1" />
          {bar('w-3/4')}
          {bar('w-1/2')}
          <div className="h-1" />
          {bar('w-2/5')}
        </div>
      )

    case 'agenda':
      return (
        <div className="space-y-1">
          {bar('w-2/5', 'h-1.5', true)}
          {sep()}
          {['w-full', 'w-4/5', 'w-full', 'w-3/4', 'w-5/6', 'w-full'].map((w, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`w-1 h-1.5 rounded-sm flex-shrink-0 ${faded ? 'bg-slate-100' : 'bg-slate-200'}`} />
              {bar(w)}
            </div>
          ))}
        </div>
      )

    case 'minutes':
      return (
        <div className="space-y-1">
          {bar('w-3/5', 'h-1.5', true)}
          {bar('w-2/5')}
          <div className="h-0.5" />
          {['w-full', 'w-4/5', 'w-full', 'w-5/6'].map((w, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className={`w-1 h-1 rounded-full flex-shrink-0 ${faded ? 'bg-slate-100' : 'bg-slate-200'}`} />
              {bar(w)}
            </div>
          ))}
        </div>
      )

    case 'letter':
      return (
        <div className="space-y-1">
          {bar('w-2/5')}
          {bar('w-3/5')}
          <div className="h-0.5" />
          {bar('w-full')}
          {bar('w-full')}
          {bar('w-4/5')}
          <div className="h-0.5" />
          {bar('w-full')}
          {bar('w-3/5')}
        </div>
      )

    case 'report':
      return (
        <div className="space-y-1">
          {bar('w-3/5', 'h-1.5', true)}
          {bar('w-2/5')}
          <div className="h-0.5" />
          {bar('w-full')}
          {bar('w-full')}
          {bar('w-4/5')}
          <div className="h-0.5" />
          {bar('w-1/3', 'h-1', true)}
          {bar('w-full')}
          {bar('w-3/4')}
        </div>
      )

    case 'financial':
      return (
        <div className="space-y-1">
          {bar('w-3/5', 'h-1.5', true)}
          {[['w-2/5', 'w-1/4'], ['w-2/5', 'w-1/4'], ['w-2/5', 'w-1/4']].map(([l, r], i) => (
            <div key={i} className="flex justify-between items-center">
              {bar(l)}
              {bar(r, 'h-1', true)}
            </div>
          ))}
          {sep()}
          <div className="flex justify-between items-center">
            {bar('w-2/5', 'h-1.5', true)}
            {bar('w-1/4', 'h-1.5', true)}
          </div>
        </div>
      )

    case 'risk':
      return (
        <div className="space-y-1.5">
          {bar('w-2/5', 'h-1.5', true)}
          {(faded
            ? ['bg-slate-100', 'bg-slate-100', 'bg-slate-100', 'bg-slate-100']
            : ['bg-red-300', 'bg-amber-300', 'bg-amber-300', 'bg-emerald-300']
          ).map((dot, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />
              <div className={`h-1 flex-1 rounded-sm ${faded ? 'bg-slate-100' : 'bg-slate-200'}`} />
            </div>
          ))}
        </div>
      )

    case 'resolution':
      return (
        <div className="space-y-1">
          {bar('w-3/5', 'h-1.5', true)}
          {bar('w-full')}
          {bar('w-full')}
          {bar('w-4/5')}
          <div className="h-0.5" />
          {bar('w-3/5', 'h-1.5', true)}
          {bar('w-full')}
          {bar('w-3/4')}
        </div>
      )

    case 'aob':
      return (
        <div className="space-y-1">
          {[0, 1, 2].map(i => (
            <div key={i}>
              {i > 0 && <div className="h-0.5" />}
              {bar('w-3/4', 'h-1.5', true)}
              {bar('w-full')}
              {bar('w-4/5')}
            </div>
          ))}
        </div>
      )

    default:
      return null
  }
}

// ─── Modal document content ─────────────────────────────────────────────────

function SectionModalContent({ section, entity }: { section: Section; entity: Entity }) {
  switch (section.type) {
    case 'cover':
      return (
        <div className="flex flex-col items-center justify-center text-center py-8 gap-3 min-h-[200px]">
          <EntityLogo entity={entity} size="lg" />
          <div>
            <p className="text-sm font-bold text-slate-800">{entity.name}</p>
            <p className="text-xs text-slate-400 mt-0.5">Board of Directors</p>
          </div>
          <div className="w-px h-4 bg-slate-200" />
          <div>
            <p className="text-sm font-semibold text-slate-700">Board Pack · Q1 2026</p>
            <p className="text-xs text-slate-400 mt-0.5">{entity.nextBoard}</p>
          </div>
          <p className="text-[10px] text-slate-300 uppercase tracking-widest mt-1">Strictly Confidential</p>
        </div>
      )

    case 'agenda':
      return (
        <div className="space-y-2.5">
          <div>
            <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">Board Meeting Agenda</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{entity.nextBoard} · 10:00 hrs · Registered Office</p>
          </div>
          <div className="h-px bg-slate-100" />
          <div className="space-y-1.5">
            {[
              'Apologies for Absence',
              'Declarations of Interest',
              'Minutes of Previous Meeting (15 Dec 2025)',
              'Matters Arising',
              "Chief Executive's Report",
              'Q4 2025 Financial Statements',
              'Risk & Compliance Update',
              'Resolutions for Approval',
              'Any Other Business',
              'Date of Next Meeting',
            ].map((item, i) => (
              <div key={i} className="flex gap-2.5">
                <span className="text-[10px] text-slate-400 font-medium w-4 flex-shrink-0 tabular-nums">{i + 1}.</span>
                <span className="text-[10px] text-slate-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )

    case 'minutes':
      return (
        <div className="space-y-2">
          <div>
            <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">Minutes of Board Meeting</p>
            <p className="text-[10px] text-slate-400">Held on 15 December 2025 · 10:00 GMT</p>
          </div>
          <div className="text-[10px] text-slate-600">
            <p><span className="font-medium text-slate-700">Present:</span> D. Thompson (Chair), S. Chen, J. Mwangi, P. Walsh, R. Patel</p>
            <p className="mt-0.5"><span className="font-medium text-slate-700">In Attendance:</span> Company Secretary, External Auditors (PwC)</p>
          </div>
          <div className="h-px bg-slate-100" />
          <div className="space-y-2">
            {[
              ['1.', 'Apologies for Absence', 'No apologies were received. A quorum was present throughout.'],
              ['2.', 'Conflicts of Interest', 'No conflicts were declared in relation to items on the agenda.'],
              ['3.', 'Minutes of Previous Meeting', 'The minutes of the meeting held 18 September 2025 were approved as an accurate record. Proposed: P. Walsh. Seconded: J. Mwangi.'],
              ['4.', 'Matters Arising', 'The action log was reviewed. All actions noted as complete or carried to this agenda.'],
            ].map(([num, title, body]) => (
              <div key={num}>
                <p className="text-[10px] font-semibold text-slate-700">{num} {title}</p>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      )

    case 'letter':
      return (
        <div className="space-y-2 text-[10px]">
          <p className="text-slate-400">{entity.nextBoard}</p>
          <p className="font-semibold text-slate-800">Dear Board Members,</p>
          <p className="text-slate-600 leading-relaxed">
            I am pleased to present the Q1 2026 Board Pack for {entity.name} ahead of the board meeting scheduled for {entity.nextBoard}.
          </p>
          <p className="text-slate-600 leading-relaxed">
            The pack contains the CEO's report, Q4 2025 financial statements, and three resolutions for board approval. I draw your attention in particular to the CEO's commentary on trading performance and the proposed amendments to the banking facilities.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Key points for attention at this meeting: revenue performance against budget, the proposed capital restructuring, and the director appointment being put forward for approval.
          </p>
          <p className="text-slate-600">I look forward to seeing you all.</p>
          <div className="pt-1">
            <p className="font-semibold text-slate-700">D. Thompson</p>
            <p className="text-slate-400">Board Chairman</p>
          </div>
        </div>
      )

    case 'report':
      return (
        <div className="space-y-2 text-[10px]">
          <div>
            <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">Chief Executive's Report</p>
            <p className="text-slate-400">Q4 2025 & Q1 2026 Outlook</p>
          </div>
          <div className="h-px bg-slate-100" />
          <div>
            <p className="font-semibold text-slate-700 mb-0.5">Executive Summary</p>
            <p className="text-slate-600 leading-relaxed">Revenue for Q4 2025 was £12.4m, exceeding budget by £0.5m (4%). EBITDA margin improved to 22.6%, up from 19.8% in Q3 2025.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-700 mb-0.5">Key Highlights</p>
            <div className="space-y-0.5 text-slate-600">
              <p>· New client wins: 3 contracts signed (combined value £2.1m)</p>
              <p>· Headcount: 187 FTEs, +5 since September 2025</p>
              <p>· Pipeline: £18.2m qualified, conversion rate 34%</p>
            </div>
          </div>
          <div>
            <p className="font-semibold text-slate-700 mb-0.5">Operational Update</p>
            <p className="text-slate-600 leading-relaxed">The technology migration programme completed on schedule in November. All legacy systems have been decommissioned and the new platform is operating at full capacity.</p>
          </div>
        </div>
      )

    case 'financial':
      return (
        <div className="space-y-2 text-[10px]">
          <div>
            <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">Q4 Financial Statements</p>
            <p className="text-slate-400">Quarter ended 31 December 2025</p>
          </div>
          <div className="h-px bg-slate-100" />
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-[9px] text-slate-400 font-medium pb-1">P&L Summary</th>
                <th className="text-right text-[9px] text-slate-400 font-medium pb-1">Q4 2025</th>
                <th className="text-right text-[9px] text-slate-400 font-medium pb-1">Q4 2024</th>
                <th className="text-right text-[9px] text-slate-400 font-medium pb-1">Var</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              {[
                ['Revenue', '£12.4m', '£10.8m', '+15%'],
                ['Cost of Sales', '£8.1m', '£7.2m', '+13%'],
                ['Gross Profit', '£4.3m', '£3.6m', '+19%'],
                ['Admin Expenses', '£1.5m', '£1.4m', '+7%'],
              ].map(([label, q4, q3, v]) => (
                <tr key={label} className="border-b border-slate-50">
                  <td className="py-0.5">{label}</td>
                  <td className="text-right tabular-nums">{q4}</td>
                  <td className="text-right tabular-nums text-slate-400">{q3}</td>
                  <td className="text-right tabular-nums text-emerald-600">{v}</td>
                </tr>
              ))}
              <tr className="font-semibold text-slate-700">
                <td className="pt-1">EBITDA</td>
                <td className="text-right tabular-nums pt-1">£2.8m</td>
                <td className="text-right tabular-nums text-slate-400 pt-1">£2.2m</td>
                <td className="text-right tabular-nums text-emerald-600 pt-1">+27%</td>
              </tr>
            </tbody>
          </table>
        </div>
      )

    case 'risk':
      return (
        <div className="space-y-2 text-[10px]">
          <div>
            <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">Risk & Compliance</p>
            <p className="text-slate-400">Quarter ended 31 December 2025</p>
          </div>
          <div className="h-px bg-slate-100" />
          <div className="space-y-2">
            {[
              { level: 'HIGH', color: 'text-red-600 bg-red-50 border-red-200', title: 'Regulatory Risk', body: 'EU AI Act compliance review initiated. Legal counsel engaged. Board approval required by March 2026.' },
              { level: 'MED', color: 'text-amber-600 bg-amber-50 border-amber-200', title: 'Operational Risk', body: 'Single-supplier dependency for cloud infrastructure. RFP for secondary provider in progress.' },
              { level: 'MED', color: 'text-amber-600 bg-amber-50 border-amber-200', title: 'Financial Risk', body: 'FX exposure on EUR-denominated contracts (£3.2m). Hedging strategy under review with CFO.' },
              { level: 'LOW', color: 'text-emerald-600 bg-emerald-50 border-emerald-200', title: 'Reputational Risk', body: 'Social media monitoring in place. No incidents to report this quarter.' },
            ].map(({ level, color, title, body }) => (
              <div key={title} className="flex gap-2">
                <span className={`inline-block border px-1 py-0.5 rounded text-[8px] font-bold flex-shrink-0 leading-none mt-0.5 ${color}`}>{level}</span>
                <div>
                  <p className="font-semibold text-slate-700">{title}</p>
                  <p className="text-slate-500 mt-0.5 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    case 'resolution':
      return (
        <div className="space-y-3 text-[10px]">
          <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">Resolutions for Approval</p>
          <div className="h-px bg-slate-100" />
          {[
            { num: 1, title: 'Approval of Q4 2025 Accounts', text: 'IT IS RESOLVED THAT the Q4 2025 management accounts, as presented to the Board, be and are hereby approved and signed by the Chair on behalf of the Board.' },
            { num: 2, title: 'Banking Facility Renewal', text: 'IT IS RESOLVED THAT the Board hereby approves the renewal of the revolving credit facility with Barclays Corporate on the terms set out in the facility letter dated 4 February 2026.' },
            { num: 3, title: 'Director Appointment', text: 'IT IS RESOLVED THAT [Name] be appointed as an Independent Non-Executive Director of the Company with effect from 15 March 2026, subject to satisfactory completion of due diligence.' },
          ].map(({ num, title, text }) => (
            <div key={num} className="space-y-0.5">
              <p className="font-bold text-slate-700 uppercase tracking-wide text-[9px]">Resolution {num} — {title}</p>
              <p className="text-slate-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      )

    case 'aob':
      return (
        <div className="space-y-2 text-[10px]">
          <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">Any Other Business</p>
          <div className="h-px bg-slate-100" />
          <div className="space-y-2.5">
            {[
              { n: 1, title: 'Q2 2026 Board Meeting', body: 'Proposed date: 25 June 2026, 10:00 BST at Registered Office. Confirmation requested from all directors by 20 March.' },
              { n: 2, title: 'Audit Committee — Terms of Reference', body: 'Updated terms of reference to be circulated for board approval by email ahead of the Q2 meeting.' },
              { n: 3, title: 'Board Effectiveness Survey', body: 'Annual survey to be issued w/c 16 March 2026. Results will be presented and discussed at the Q2 board meeting.' },
            ].map(({ n, title, body }) => (
              <div key={n} className="flex gap-2">
                <span className="text-slate-400 font-medium flex-shrink-0 w-3 tabular-nums">{n}.</span>
                <div>
                  <p className="font-semibold text-slate-700">{title}</p>
                  <p className="text-slate-500 mt-0.5 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    default:
      return null
  }
}

// ─── Thumbnail ───────────────────────────────────────────────────────────────

function PageThumbnail({
  section,
  index,
  status,
  onClick,
}: {
  section: Section
  index: number
  status: SectionStatus
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="group text-left border border-slate-200 rounded-lg bg-white hover:border-slate-400 hover:shadow-md transition-all overflow-hidden"
    >
      <div className={`h-1.5 w-full ${status === 'complete' ? 'bg-emerald-400' : status === 'in-progress' ? 'bg-blue-400' : 'bg-slate-200'}`} />
      <div className="p-3">
        <p className="text-[10px] text-slate-400 font-medium mb-1.5 tabular-nums">{String(index + 1).padStart(2, '0')}</p>
        <p className="text-xs font-semibold text-slate-800 leading-snug mb-2.5 group-hover:text-slate-900">{section.title}</p>
        <div className="mb-3">
          <MiniPreview type={section.type} faded={status === 'pending'} />
        </div>
        <StatusBadge status={status} />
      </div>
    </button>
  )
}

// ─── Browse modal ─────────────────────────────────────────────────────────────

function BrowseModal({
  entity,
  statuses,
  initialIndex,
  onClose,
}: {
  entity: Entity
  statuses: SectionStatus[]
  initialIndex: number
  onClose: () => void
}) {
  const [current, setCurrent] = useState(initialIndex)
  const section = SECTIONS[current]
  const status = statuses[current]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-[520px] max-h-[80vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-shrink-0">
          <div>
            <p className="text-xs text-slate-400 font-medium">{entity.shortName} · Board Pack Q1 2026</p>
            <p className="text-sm font-semibold text-slate-800 mt-0.5">{section.title}</p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={status} />
            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-700"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          </div>
        </div>

        {/* Document content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className={`h-1 w-full rounded mb-5 ${status === 'complete' ? 'bg-emerald-400' : status === 'in-progress' ? 'bg-blue-400' : 'bg-slate-200'}`} />
          <SectionModalContent section={section} entity={entity} />
        </div>

        {/* Edit CTA */}
        <div className="px-5 py-3 border-t border-slate-100 flex-shrink-0">
          <Link
            href={`/entity/${entity.id}/edit/${current}`}
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 2l3 3-8 8H3v-3L11 2z" />
            </svg>
            Edit this section
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50 flex-shrink-0">
          <button
            onClick={() => setCurrent(p => Math.max(0, p - 1))}
            disabled={current === 0}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 4L6 8l4 4" />
            </svg>
            Previous
          </button>
          <span className="text-xs text-slate-400 tabular-nums">{current + 1} / {SECTIONS.length}</span>
          <button
            onClick={() => setCurrent(p => Math.min(SECTIONS.length - 1, p + 1))}
            disabled={current === SECTIONS.length - 1}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 4l4 4-4 4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function BoardPackViewer({ entity }: { entity: Entity }) {
  const statuses = getSectionStatuses(entity.completion)
  const [browseIndex, setBrowseIndex] = useState<number | null>(null)
  const completeCount = statuses.filter(s => s === 'complete').length

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          <EntityLogo entity={entity} size="lg" />
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Board Pack · Q1 2026</p>
            <h2 className="text-lg font-semibold text-slate-900 mt-0.5">{entity.name}</h2>
            <p className="text-xs text-slate-500 mt-1">
              {completeCount} of {SECTIONS.length} sections complete · Next board meeting {entity.nextBoard}
            </p>
          </div>
        </div>
        <button
          onClick={() => setBrowseIndex(0)}
          className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-white text-xs font-medium rounded-lg transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="12" height="12" rx="1" />
            <path d="M5 6h6M5 9h4" />
          </svg>
          Browse Document
        </button>
      </div>

      {/* Thumbnail grid */}
      <div className="grid grid-cols-3 gap-3 overflow-y-auto pb-2">
        {SECTIONS.map((section, i) => (
          <PageThumbnail
            key={i}
            section={section}
            index={i}
            status={statuses[i]}
            onClick={() => setBrowseIndex(i)}
          />
        ))}
      </div>

      {/* Browse modal */}
      {browseIndex !== null && (
        <BrowseModal
          entity={entity}
          statuses={statuses}
          initialIndex={browseIndex}
          onClose={() => setBrowseIndex(null)}
        />
      )}
    </div>
  )
}
