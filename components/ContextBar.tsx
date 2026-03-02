'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ENTITIES } from '@/components/data'
import EntityLogo from '@/components/EntityLogo'

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
              <div className={`flex-1 h-px ${i < currentIdx ? 'bg-slate-500' : 'bg-slate-200'}`} />
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

interface ContextBarProps {
  currentEntityId?: number
}

export default function ContextBar({ currentEntityId }: ContextBarProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const inProgress = ENTITIES.filter(e => e.completion > 0 && e.completion < 100).length
  const approved = ENTITIES.filter(e => e.completion >= 96).length

  return (
    <div className="border-b border-slate-200 bg-slate-50 flex-shrink-0">
      {/* Header strip */}
      <div className="px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <span className="text-sm font-semibold text-slate-700">
            {ENTITIES.length} Entities
          </span>
          <span className="h-4 w-px bg-slate-300" />
          <span className="text-sm text-slate-500">Q1 2026</span>
          <span className="h-4 w-px bg-slate-300" />
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              {inProgress} in progress
            </span>
            {approved > 0 && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {approved} approved
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(v => !v)}
          aria-expanded={isExpanded}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 active:bg-slate-100 transition-colors shadow-sm"
        >
          Manage entities
          <svg
            className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
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

      {/* Expandable panel */}
      <div className={`overflow-hidden transition-all duration-200 ${isExpanded ? 'max-h-[640px]' : 'max-h-0'}`}>
        <div className="px-6 pb-4">
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-lg">

            {/* Table header */}
            <div className="grid grid-cols-[2.5fr_1.5fr_1.5fr_3.5fr_auto] gap-x-4 items-center px-5 py-3 bg-slate-50 border-b border-slate-200">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Entity</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Country</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Next Board Meeting</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Progress</span>
              <span />
            </div>

            {/* Entity rows */}
            {ENTITIES.map(entity => {
              const isActive = entity.id === currentEntityId
              return (
                <Link
                  key={entity.id}
                  href={`/entity/${entity.id}`}
                  className={`grid grid-cols-[2.5fr_1.5fr_1.5fr_3.5fr_auto] gap-x-4 items-center px-5 py-4 border-b border-slate-100 last:border-0 transition-colors cursor-pointer ${
                    isActive ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-slate-50 active:bg-slate-100'
                  }`}
                >
                  {/* Entity name + logo */}
                  <div className="flex items-center gap-3 min-w-0">
                    <EntityLogo entity={entity} />
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold leading-snug truncate ${isActive ? 'text-blue-700' : 'text-slate-800'}`}>
                        {entity.shortName}
                      </p>
                      <p className="text-xs text-slate-400 truncate mt-0.5">{entity.name}</p>
                    </div>
                  </div>

                  {/* Country */}
                  <span className="text-xs text-slate-500">{entity.country}</span>

                  {/* Next board */}
                  <span className="text-xs text-slate-600 font-medium">{entity.nextBoard}</span>

                  {/* Milestone tracker */}
                  <MilestoneTracker completion={entity.completion} />

                  {/* Chevron */}
                  <svg
                    className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-300'}`}
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 4l4 4-4 4" />
                  </svg>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

