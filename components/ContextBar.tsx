'use client'

import { useState } from 'react'
import { ENTITIES } from '@/components/data'

const MILESTONES = [
  'Agenda set',
  'Papers requested',
  'Papers received',
  'Pack drafted',
  'In review',
  'Approved',
]

function getCurrentMilestoneIndex(completion: number): number {
  if (completion >= 96) return 5
  if (completion >= 81) return 4
  if (completion >= 61) return 3
  if (completion >= 41) return 2
  if (completion >= 21) return 1
  if (completion >= 1) return 0
  return -1
}

function MilestoneTracker({ completion }: { completion: number }) {
  const currentIdx = getCurrentMilestoneIndex(completion)

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center w-full">
        {MILESTONES.map((_, i) => (
          <div
            key={i}
            className={`flex items-center ${i < MILESTONES.length - 1 ? 'flex-1' : ''}`}
          >
            <div
              className={`w-3 h-3 rounded-full flex-shrink-0 ${
                i < currentIdx
                  ? 'bg-slate-500'
                  : i === currentIdx
                  ? 'bg-blue-500'
                  : 'bg-slate-200'
              }`}
            />
            {i < MILESTONES.length - 1 && (
              <div
                className={`flex-1 h-px ${
                  i < currentIdx ? 'bg-slate-500' : 'bg-slate-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <span className="text-xs text-slate-400 leading-none">
        {currentIdx >= 0 ? MILESTONES[currentIdx] : 'Not started'}
      </span>
    </div>
  )
}

export default function ContextBar() {
  const [isExpanded, setIsExpanded] = useState(false)

  const inProgress = ENTITIES.filter(e => e.completion > 0 && e.completion < 100).length

  return (
    <div className="border-b border-slate-200 bg-slate-50 flex-shrink-0">
      <div className="px-6 py-2.5 flex items-center justify-between">
        <span className="text-sm text-slate-600 font-medium">
          {ENTITIES.length} Entities&nbsp;&nbsp;·&nbsp;&nbsp;Q1 2026&nbsp;&nbsp;·&nbsp;&nbsp;{inProgress} of {ENTITIES.length} board packs in progress
        </span>
        <button
          onClick={() => setIsExpanded(v => !v)}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 transition-colors font-medium"
          aria-expanded={isExpanded}
        >
          {isExpanded ? 'Hide details' : 'Show details'}
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </button>
      </div>

      <div className={`overflow-hidden transition-all duration-200 ${isExpanded ? 'max-h-[540px]' : 'max-h-0'}`}>
        <div className="px-6 pb-3">
          <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
            <div className="grid grid-cols-[2fr_1fr_1.5fr_4fr_auto] gap-x-4 items-center px-4 py-2 border-b border-slate-100">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Entity</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Country</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Next Board Meeting</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Progress</span>
              <span></span>
            </div>
            {ENTITIES.map(entity => (
              <div
                key={entity.id}
                role="button"
                tabIndex={0}
                className="grid grid-cols-[2fr_1fr_1.5fr_4fr_auto] gap-x-4 items-center px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer"
              >
                <span className="text-sm font-medium text-slate-800 truncate">{entity.shortName}</span>
                <span className="text-xs text-slate-500">{entity.countryCode}</span>
                <span className="text-xs text-slate-500">{entity.nextBoard}</span>
                <MilestoneTracker completion={entity.completion} />
                <svg
                  className="w-4 h-4 text-slate-300 flex-shrink-0"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 4l4 4-4 4" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
