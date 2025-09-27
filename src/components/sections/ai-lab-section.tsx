'use client'

import { useState, useRef, useCallback, useMemo } from 'react'
import { motion } from 'motion/react'
import {
  FadeIn,
  CircularLightningPulseAlwaysOn
} from "@/components/animated-elements"
import { AIAssistantTab } from "@/components/ai-labs/ai-assistant-tab"
import { RAGDemoTab } from "@/components/ai-labs/rag-demo-tab"
import { AnalyticsTab } from "@/components/ai-labs/analytics-tab"

function AILabsHero() {
  return (
    <div className="relative text-center space-y-6 mb-12">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-lightning-yellow/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-10 right-1/4 w-48 h-48 bg-lightning-orange/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -top-5 left-1/2 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating Lightning Particles */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        <div className="absolute top-1/4 left-1/6 text-lightning-yellow/20 text-xs animate-float">⚡</div>
        <div className="absolute top-3/4 right-1/6 text-lightning-orange/20 text-sm animate-float-delayed">⚡</div>
        <div className="absolute top-1/2 left-3/4 text-lightning-yellow/15 text-xs animate-float-slow">⚡</div>
      </div>

      <FadeIn>
        <div className="relative">
          <CircularLightningPulseAlwaysOn intensity="medium" className="inline-block">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-lightning-gradient mb-2">
              AI Labz Playground
            </h2>
          </CircularLightningPulseAlwaysOn>

          {/* Lightning accent line */}
          <div className="flex items-center justify-center mt-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-lightning-yellow/50"></div>
            <div className="mx-3 text-lightning-yellow text-lg">⚡</div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-lightning-yellow/50"></div>
          </div>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Interactive AI demonstrations
          </p>
          <p className="text-sm text-gray-500 max-w-lg mx-auto mt-2">
            Explore cutting-edge AI capabilities through live, hands-on experiences
          </p>
        </div>
      </FadeIn>
    </div>
  )
}

// Enhanced Linear.app-inspired Tab Navigation
function TabNavigation({ activeTab, onTabChange }: {
  activeTab: 'assistant' | 'rag' | 'analytics'
  onTabChange: (tab: 'assistant' | 'rag' | 'analytics') => void
}) {
  const tabs = [
    { id: 'assistant', label: 'AI Assistant', icon: '🤖', gradient: 'from-blue-500 to-cyan-400', accent: 'text-blue-400' },
    { id: 'rag', label: 'RAG Demo', icon: '📚', gradient: 'from-green-500 to-emerald-400', accent: 'text-green-400' },
    { id: 'analytics', label: 'Analytics', icon: '📊', gradient: 'from-purple-500 to-pink-400', accent: 'text-purple-400' }
  ] as const

  const activeTabIndex = tabs.findIndex(tab => tab.id === activeTab)

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent, currentTabId: string) => {
    const currentIndex = tabs.findIndex(tab => tab.id === currentTabId)

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1
        onTabChange(tabs[prevIndex].id as 'assistant' | 'rag' | 'analytics')
        break
      case 'ArrowRight':
        e.preventDefault()
        const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0
        onTabChange(tabs[nextIndex].id as 'assistant' | 'rag' | 'analytics')
        break
      case 'Home':
        e.preventDefault()
        onTabChange(tabs[0].id as 'assistant' | 'rag' | 'analytics')
        break
      case 'End':
        e.preventDefault()
        onTabChange(tabs[tabs.length - 1].id as 'assistant' | 'rag' | 'analytics')
        break
    }
  }

  return (
    <div className="relative mb-12">
      {/* Enhanced Glass container for tabs */}
      <div className="relative backdrop-blur-2xl bg-lightning-black/40 border border-lightning-gray/20 rounded-3xl p-3 overflow-hidden shadow-2xl">

        {/* Dynamic background glow based on active tab */}
        <div className="absolute inset-0 bg-gradient-to-r from-lightning-yellow/3 via-transparent to-lightning-orange/3 opacity-70"></div>

        {/* Animated active tab background */}
        <motion.div
          className="absolute top-3 bottom-3 bg-gradient-to-r from-lightning-yellow/10 to-lightning-orange/10 rounded-2xl shadow-lg backdrop-blur-sm"
          initial={false}
          animate={{
            left: `${(activeTabIndex / tabs.length) * 100}%`,
            width: `${100 / tabs.length}%`,
          }}
          transition={{ type: "spring", bounce: 0.25, duration: 0.8 }}
        />

        {/* Tab Bar */}
        <div className="relative flex" role="tablist" aria-label="AI Labs Navigation">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                role="tab"
                tabIndex={isActive ? 0 : -1}
                aria-selected={isActive}
                aria-controls={`${tab.id}-panel`}
                id={`${tab.id}-tab`}
                onClick={() => onTabChange(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, tab.id)}
                className={`
                  relative flex-1 flex items-center justify-center gap-3 px-4 sm:px-6 py-4 text-sm font-semibold transition-all duration-500
                  whitespace-nowrap touch-target-md rounded-2xl group focus:outline-none focus:ring-2 focus:ring-lightning-yellow/50 focus:ring-offset-2 focus:ring-offset-transparent
                  ${isActive
                    ? 'text-white'
                    : 'text-gray-400 hover:text-gray-200'
                  }
                `}
              >

                {/* Icon with enhanced scaling */}
                <motion.span
                  className="relative z-10 text-xl sm:text-2xl"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {tab.icon}
                </motion.span>

                {/* Label with better typography */}
                <span className={`relative z-10 hidden sm:inline font-bold text-sm tracking-wide ${isActive ? 'text-lightning-yellow' : ''}`}>
                  {tab.label}
                </span>
                <span className={`relative z-10 sm:hidden font-bold text-xs tracking-wide ${isActive ? 'text-lightning-yellow' : ''}`}>
                  {tab.label.split(' ')[0]}
                </span>

                {/* Enhanced hover glow effect */}
                <div className={`
                  absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500
                  bg-gradient-to-r ${tab.gradient}
                `} />

                {/* Subtle pulse for active tab */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-lightning-yellow/5"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </button>
            )
          })}
        </div>


        {/* Corner lightning accents */}
        <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-lightning-yellow/20 rounded-tl-lg"></div>
        <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-lightning-orange/20 rounded-tr-lg"></div>
      </div>

      {/* Enhanced connection line to content */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-lightning-yellow via-lightning-orange to-transparent rounded-full"
        style={{ boxShadow: '0 0 6px rgba(255, 215, 0, 0.4)' }}
      />
    </div>
  )
}



export function AILabSection() {
  const [activeTab, setActiveTab] = useState<'assistant' | 'rag' | 'analytics'>('assistant')
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const tabs = useMemo<Array<'assistant' | 'rag' | 'analytics'>>(() => ['assistant', 'rag', 'analytics'], [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartX.current || !touchStartY.current) return

    const touchEndX = e.changedTouches[0].clientX
    const touchEndY = e.changedTouches[0].clientY

    const deltaX = touchStartX.current - touchEndX
    const deltaY = touchStartY.current - touchEndY

    // Only handle horizontal swipes (ignore vertical scrolling)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      const currentIndex = tabs.indexOf(activeTab)

      if (deltaX > 0 && currentIndex < tabs.length - 1) {
        // Swipe left - next tab
        setActiveTab(tabs[currentIndex + 1])
      } else if (deltaX < 0 && currentIndex > 0) {
        // Swipe right - previous tab
        setActiveTab(tabs[currentIndex - 1])
      }
    }

    touchStartX.current = null
    touchStartY.current = null
  }, [activeTab, tabs])

  return (
    <section id="ai-lab" className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Section background effects */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-lightning-yellow/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-lightning-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Lightning grid pattern */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-lightning-yellow/20 to-transparent"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-lightning-orange/20 to-transparent"></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-lightning-yellow/20 to-transparent"></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-lightning-orange/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-3 sm:px-5 lg:px-7 xl:px-10 max-w-5xl relative">

        {/* Hero Section */}
        <AILabsHero />

        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content Area with enhanced styling and swipe support */}
        <div
          ref={contentRef}
          className="relative min-h-[500px] touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Content background */}
          <div className="absolute inset-0 glass-morphism rounded-3xl border-2 border-lightning-gray/20 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-lightning-yellow/5 via-transparent to-lightning-orange/5"></div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16">
              <div className="absolute top-3 left-3 w-2 h-8 bg-lightning-yellow/40 rounded-full"></div>
              <div className="absolute top-3 left-3 w-8 h-2 bg-lightning-yellow/40 rounded-full"></div>
            </div>
            <div className="absolute top-0 right-0 w-16 h-16">
              <div className="absolute top-3 right-3 w-2 h-8 bg-lightning-orange/40 rounded-full"></div>
              <div className="absolute top-3 right-3 w-8 h-2 bg-lightning-orange/40 rounded-full"></div>
            </div>
          </div>

          {/* Swipe indicator for mobile */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20 sm:hidden">
            <div className="flex items-center gap-1 px-3 py-1 bg-lightning-black/60 rounded-full border border-lightning-gray/40">
              <div className="flex gap-1">
                {tabs.map((tab) => (
                  <div
                    key={tab}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      activeTab === tab ? 'bg-lightning-yellow' : 'bg-lightning-gray/60'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400 ml-2">Swipe ↔</span>
            </div>
          </div>

          {/* Enhanced content transitions */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{
              duration: 0.4,
              ease: [0.21, 1.11, 0.81, 0.99],
              type: "spring",
              bounce: 0.1
            }}
            className="relative z-10 p-6 sm:p-8 lg:p-10 pt-12 sm:pt-6"
            role="tabpanel"
            id={`${activeTab}-panel`}
            aria-labelledby={`${activeTab}-tab`}
          >
            {/* Tab content with stagger effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {activeTab === 'assistant' && <AIAssistantTab />}
              {activeTab === 'rag' && <RAGDemoTab />}
              {activeTab === 'analytics' && <AnalyticsTab />}
            </motion.div>
          </motion.div>

          {/* Lightning connection from tabs */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-px h-6 bg-gradient-to-b from-lightning-yellow/60 to-transparent"
          />

          {/* Floating elements */}
          <div className="absolute -top-2 -right-2 text-lightning-yellow/30 text-sm animate-float-slow">⚡</div>
          <div className="absolute -bottom-2 -left-2 text-lightning-orange/30 text-xs animate-float-delayed">⚡</div>
        </div>

      </div>
    </section>
  )
}