'use client'

import { useEffect } from 'react'
import { SimpleAIChat } from '@/components/simple-ai-chat'

export function GlobalChatWrapper() {
  useEffect(() => {
    console.log('🤖 GlobalChatWrapper mounted - Chat should be visible')
  }, [])

  return (
    <div data-testid="global-chat-wrapper">
      <SimpleAIChat />
    </div>
  )
}