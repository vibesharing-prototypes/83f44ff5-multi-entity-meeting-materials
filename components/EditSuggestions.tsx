'use client'

import { useState } from 'react'
import { EDIT_SUGGESTIONS, type EditSuggestion } from '@/components/data'

const SOURCE_CONFIG: Record<EditSuggestion['sourceType'], { className: string }> = {
  regulation: { className: 'text-rose-700 bg-rose-50 border border-rose-200' },
  market: { className: 'text-blue-700 bg-blue-50 border border-blue-200' },
  'source-material': { className: 'text-violet-700 bg-violet-50 border border-violet-200' },
}

function SparkleIcon() {
  return (
    <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <polygon points="8,2 10.1,5.9 14,8 10.1,10.1 8,14 5.9,10.1 2,8 5.9,5.9" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 8l3.5 3.5L13 5" />
    </svg>
  )
}

function BatchIcon() {
  return (
    <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="2" width="8" height="10" rx="1.5" opacity="0.5" />
      <rect x="2" y="4" width="9" height="10" rx="1.5" />
    </svg>
  )
}

export default function EditSuggestions() {
  const [applied, setApplied] = useState<Set<number>>(new Set())

  function handleApply(id: number) {
    setApplied(prev => new Set([...prev, id]))
  }

  return (
    <section>
      <div className="mb-3">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
          Edit Suggestions
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Proposed updates based on regulatory changes, market signals, and new source material
        </p>
      </div>
      <div className="rounded-lg border border-slate-200 divide-y divide-slate-100 overflow-hidden">
        {EDIT_SUGGESTIONS.map(suggestion => {
          const isApplied = applied.has(suggestion.id)
          const isBatch = suggestion.entities.length > 1
          const sourceStyle = SOURCE_CONFIG[suggestion.sourceType]

          return (
            <div
              key={suggestion.id}
              className={`flex items-start gap-4 px-4 py-4 transition-opacity ${isBatch ? 'bg-slate-50' : 'bg-white'} ${isApplied ? 'opacity-50' : ''}`}
            >
              <div className="flex-1 min-w-0">

                {/* Header: entity tag (single) or source + batch count (multi) */}
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  {!isBatch && (
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tracking-wide text-white ${suggestion.entities[0].tagColor}`}>
                      {suggestion.entities[0].tag}
                    </span>
                  )}
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${sourceStyle.className}`}>
                    {suggestion.sourceLabel}
                  </span>
                  {isBatch && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                      <BatchIcon />
                      {suggestion.entities.length} board packs
                    </span>
                  )}
                </div>

                {/* Title */}
                <p className="text-sm font-medium text-slate-900 leading-snug">
                  {suggestion.title}
                </p>

                {/* Reason */}
                <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                  {suggestion.reason}
                </p>

                {/* Affected entity tags — batch only */}
                {isBatch && (
                  <div className="flex items-center gap-1.5 flex-wrap mt-2">
                    {suggestion.entities.map(e => (
                      <span
                        key={e.tag}
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tracking-wide text-white ${e.tagColor}`}
                      >
                        {e.tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action button */}
              <button
                onClick={() => handleApply(suggestion.id)}
                disabled={isApplied}
                className={`self-start flex-shrink-0 mt-0.5 inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  isApplied
                    ? 'text-emerald-700 bg-emerald-50 border border-emerald-200 cursor-default'
                    : 'text-slate-600 bg-white border border-slate-200 hover:border-slate-400 hover:bg-slate-50 active:bg-slate-100'
                }`}
              >
                {isApplied ? <CheckIcon /> : <SparkleIcon />}
                {isApplied ? 'Queued' : 'Make changes'}
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
