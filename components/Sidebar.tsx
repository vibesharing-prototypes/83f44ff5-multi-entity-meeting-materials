'use client'

import { useState, useRef } from 'react'
import { PROMPT_STARTERS, INITIAL_MESSAGES, type ChatMessage } from '@/components/data'

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] px-3 py-2 rounded-lg text-xs leading-relaxed ${
          isUser
            ? 'bg-slate-800 text-white rounded-br-sm'
            : 'bg-slate-100 text-slate-700 rounded-bl-sm'
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}

export default function Sidebar() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [inputValue, setInputValue] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  function handleSendMessage(content: string) {
    if (!content.trim()) return
    const trimmed = content.trim()
    const userMsg: ChatMessage = {
      id: Date.now(),
      role: 'user',
      content: trimmed,
    }
    const assistantMsg: ChatMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      content: getStubResponse(trimmed),
    }
    setMessages(prev => [...prev, userMsg, assistantMsg])
    setInputValue('')
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }, 50)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-slate-200 flex-shrink-0">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
          AI Assistant
        </h2>
      </div>

      <div className="px-4 py-3 border-b border-slate-200 flex-shrink-0 space-y-1.5">
        {PROMPT_STARTERS.map(prompt => (
          <button
            key={prompt}
            onClick={() => handleSendMessage(prompt)}
            className="w-full text-left text-xs text-slate-600 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 px-3 py-2 rounded border border-slate-200 transition-colors leading-snug"
          >
            {prompt}
          </button>
        ))}
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
      >
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      <div className="px-4 py-3 border-t border-slate-200 flex-shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            className="flex-1 text-sm border border-slate-200 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-slate-400 placeholder:text-slate-300 bg-white"
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim()}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-medium rounded transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

function getStubResponse(input: string): string {
  const lower = input.toLowerCase()
  if (lower.includes('quarterly meeting') || lower.includes('plan')) {
    return 'Reviewing all 8 entities for Q1–Q4 2026. I\'ll draft a consolidated meeting schedule and check for conflicts across jurisdictions.'
  }
  if (lower.includes('board pack') || lower.includes('create')) {
    return 'Which entity should I start with? I can pull the standard template and pre-fill sections from last quarter\'s pack.'
  }
  if (lower.includes('minutes') || lower.includes('draft')) {
    return 'Select the entity and meeting date. I\'ll generate draft minutes from the agenda and any action items carried forward.'
  }
  if (lower.includes('agenda') || lower.includes('add')) {
    return 'Specify the agenda item and I\'ll add it to all upcoming board packs. Which entities should this apply to?'
  }
  return `Understood. Processing: "${input.slice(0, 60)}${input.length > 60 ? '...' : ''}"`
}
