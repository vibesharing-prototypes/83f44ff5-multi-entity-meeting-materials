import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ENTITIES } from '@/components/data'
import ContextBar from '@/components/ContextBar'
import BoardPackViewer from '@/components/BoardPackViewer'
import EntitySidebar from '@/components/EntitySidebar'

export function generateStaticParams() {
  return ENTITIES.map(entity => ({ id: String(entity.id) }))
}

export default function EntityPage({ params }: { params: { id: string } }) {
  const entity = ENTITIES.find(e => e.id === Number(params.id))
  if (!entity) notFound()

  return (
    <div className="flex h-full overflow-hidden bg-white">
      <main className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <ContextBar currentEntityId={entity.id} />

        {/* Breadcrumb */}
        <div className="flex items-center gap-3 px-6 pt-4 pb-0 flex-shrink-0">
          <Link
            href="/"
            aria-label="Back to Home"
            className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-600 hover:text-slate-900 transition-colors flex-shrink-0"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 4L6 8l4 4" />
            </svg>
          </Link>
          <div className="flex items-center gap-1.5">
            <Link
              href="/"
              className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
            >
              Home
            </Link>
            <svg className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 2l4 4-4 4" />
            </svg>
            <span className="text-sm font-semibold text-slate-800">{entity.shortName}</span>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <BoardPackViewer entity={entity} />
        </div>
      </main>

      <aside className="w-80 flex-shrink-0 border-l border-slate-200 flex flex-col">
        <EntitySidebar entity={entity} />
      </aside>
    </div>
  )
}
