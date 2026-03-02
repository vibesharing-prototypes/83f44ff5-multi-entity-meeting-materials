import { ACTION_ITEMS } from '@/components/data'

export default function NeedsYouNow() {
  return (
    <section>
      <div className="mb-3">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
          Action Items
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Blockers and decisions needed to progress your board packs
        </p>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white divide-y divide-slate-100">
        {ACTION_ITEMS.map(item => (
          <div
            key={item.id}
            className="flex items-start gap-4 px-4 py-4"
          >
            <div className="flex-1 min-w-0">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tracking-wide text-white ${item.tagColor}`}
              >
                {item.entityTag}
              </span>
              <p className="text-sm font-medium text-slate-900 leading-snug mt-1.5">
                {item.title}
              </p>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                {item.description}
              </p>
            </div>
            <button className="self-start flex-shrink-0 mt-0.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:border-slate-400 hover:bg-slate-50 active:bg-slate-100 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap">
              {item.actionLabel}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
