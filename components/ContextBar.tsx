'use client'

import { useState } from 'react'
import { ENTITIES } from '@/components/data'

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

      <div className={`overflow-hidden transition-all duration-200 ${isExpanded ? 'max-h-[480px]' : 'max-h-0'}`}>
        <div className="px-6 pb-3">
          <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
            <div className="grid grid-cols-[2fr_1fr_1.5fr_3fr_auto_auto] gap-x-4 items-center px-4 py-2 border-b border-slate-100">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Entity</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Country</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Next Board</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Progress</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide w-8 text-right">%</span>
              <span></span>
            </div>
            {ENTITIES.map(entity => (
              <div
                key={entity.id}
                className="grid grid-cols-[2fr_1fr_1.5fr_3fr_auto_auto] gap-x-4 items-center px-4 py-2.5 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors"
              >
                <span className="text-sm font-medium text-slate-800 truncate">{entity.shortName}</span>
                <span className="text-xs text-slate-500">{entity.countryCode}</span>
                <span className="text-xs text-slate-500">{entity.nextBoard}</span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-slate-700 rounded-full transition-all"
                      style={{ width: `${entity.completion}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-slate-600 w-8 text-right tabular-nums">{entity.completion}%</span>
                <button className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors whitespace-nowrap ml-2">
                  {entity.completion >= 90 ? 'Review' : 'Resume'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
