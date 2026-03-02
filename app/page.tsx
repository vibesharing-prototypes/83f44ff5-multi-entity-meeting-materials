import ContextBar from '@/components/ContextBar'
import NeedsYouNow from '@/components/NeedsYouNow'
import EditSuggestions from '@/components/EditSuggestions'
import Sidebar from '@/components/Sidebar'

export default function Home() {
  return (
    <div className="flex h-full overflow-hidden bg-white">
      <main className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <ContextBar />
        <div className="px-6 pt-5 pb-1 flex-shrink-0">
          <h1 className="text-xl font-semibold text-slate-900">Home</h1>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="grid grid-cols-2 gap-6 items-start">
            <NeedsYouNow />
            <EditSuggestions />
          </div>
        </div>
      </main>
      <aside className="w-80 flex-shrink-0 border-l border-slate-200 flex flex-col">
        <Sidebar />
      </aside>
    </div>
  )
}
