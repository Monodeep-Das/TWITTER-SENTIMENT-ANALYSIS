"use client"

import { Info } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <header className="border-b border-border/50 py-8 md:py-10">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-8 bg-gradient-to-b from-primary via-accent to-secondary rounded-full" />
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">Sentiment Predictor</h1>
        </div>

        <div className="relative">
          <button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="text-muted-foreground hover:text-accent transition-colors duration-300 p-1"
            aria-label="Information"
          >
            <Info size={18} />
          </button>
          {showTooltip && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-64 max-w-[calc(100vw-2rem)] bg-card/95 backdrop-blur-md text-card-foreground p-4 rounded-lg text-xs leading-relaxed shadow-lg border border-border/50 whitespace-normal animate-in fade-in duration-200 z-10 pointer-events-none">
              Uses a Logistic Regression model trained on Sentiment140 to predict tweet sentiment.
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
