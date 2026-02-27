import ContextBar from '@/components/ContextBar'
import NeedsYouNow from '@/components/NeedsYouNow'
import EntityCardStrip from '@/components/EntityCardStrip'
import Sidebar from '@/components/Sidebar'

export default function Home() {
  return (
    <div className="flex h-full overflow-hidden bg-white">
      <main className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <ContextBar />
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          <NeedsYouNow />
          <EntityCardStrip />
        </div>
      </main>
      <aside className="w-80 flex-shrink-0 border-l border-slate-200 flex flex-col">
        <Sidebar />
      </aside>
    </div>
  )
}
