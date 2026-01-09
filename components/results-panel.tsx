"use client"

import { ThumbsUp, ThumbsDown } from "lucide-react"

interface ResultsPanelProps {
  sentiment: "positive" | "negative"
  confidence: number
}

export default function ResultsPanel({ sentiment, confidence }: ResultsPanelProps) {
  const isPositive = sentiment === "positive"
  
  // FIX: Since the backend already sends a percentage (0-100), 
  // we just need to round it, not multiply it again.
  const percentage = Math.round(confidence)

  return (
    <div className="mt-8 p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`p-3 rounded-lg ${
            isPositive
              ? "bg-green-500/20 text-green-600 dark:text-green-400"
              : "bg-red-500/20 text-red-600 dark:text-red-400"
          }`}
        >
          {isPositive ? <ThumbsUp size={24} /> : <ThumbsDown size={24} />}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground capitalize">
            {isPositive ? "Positive" : "Negative"}
          </h3>
          <p className="text-sm text-muted-foreground">Sentiment detected</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Confidence</span>
          {/* We display the percentage here */}
          <span className="text-sm font-semibold text-foreground">{percentage}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isPositive
                ? "bg-gradient-to-r from-green-500 to-green-600"
                : "bg-gradient-to-r from-red-500 to-red-600"
            }`}
            // The style width also uses the 0-100 value
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}