'use client'

import { useMemo } from 'react'
import { ENTITIES, type Entity } from '@/components/data'

function getDaysUntil(date: Date): number {
  return Math.ceil((date.getTime() - Date.now()) / 86400000)
}

function getDaysClass(days: number): string {
  if (days <= 7) return 'text-red-600 font-semibold'
  if (days <= 14) return 'text-amber-600 font-semibold'
  return 'text-slate-400'
}

function EntityCard({ entity }: { entity: Entity }) {
  const daysUntil = useMemo(() => getDaysUntil(entity.nextBoardDate), [entity.nextBoardDate])
  const daysClass = getDaysClass(daysUntil)

  return (
    <div className="flex-shrink-0 w-52 rounded-lg border border-slate-200 bg-white p-4 hover:border-slate-400 hover:shadow-sm transition-all cursor-pointer select-none">
      <p className="text-xs text-slate-400 font-medium mb-0.5 uppercase tracking-wide">{entity.countryCode}</p>
      <p className="text-sm font-semibold text-slate-800 leading-snug mb-3 truncate">{entity.shortName}</p>

      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-slate-500">{entity.nextBoard}</span>
        <span className={`text-xs tabular-nums ${daysClass}`}>{daysUntil}d</span>
      </div>

      <div className="h-1 bg-slate-100 rounded-full mb-1.5 overflow-hidden">
        <div
          className="h-full bg-slate-700 rounded-full transition-all"
          style={{ width: `${entity.completion}%` }}
        />
      </div>

      <p className="text-xs text-slate-400">{entity.completion}% complete</p>
    </div>
  )
}

export default function EntityCardStrip() {
  return (
    <section className="pb-2">
      <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
        In Progress
      </h2>
      <div
        className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1"
        tabIndex={0}
      >
        {ENTITIES.map(entity => (
          <EntityCard key={entity.id} entity={entity} />
        ))}
      </div>
      <p className="text-xs text-slate-400 mt-2.5">
        Select an entity to continue — the agent will take it from there.
      </p>
    </section>
  )
}
