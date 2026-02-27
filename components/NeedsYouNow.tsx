import { ACTION_ITEMS } from '@/components/data'

export default function NeedsYouNow() {
  return (
    <section>
      <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
        Needs You Now
      </h2>
      <div className="rounded-lg border border-slate-200 bg-white divide-y divide-slate-100">
        {ACTION_ITEMS.map(item => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-6 px-4 py-4"
          >
            <div className="min-w-0">
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
            <button className="flex-shrink-0 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 active:bg-slate-900 px-3 py-1.5 rounded transition-colors whitespace-nowrap">
              {item.actionLabel}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
