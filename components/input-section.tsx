"use client"

import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InputSectionProps {
  text: string
  setText: (text: string) => void
  onAnalyze: () => void
  onRandomTweet: () => void
  isLoading: boolean
  isDisabled: boolean
}

export default function InputSection({
  text,
  setText,
  onAnalyze,
  onRandomTweet,
  isLoading,
  isDisabled,
}: InputSectionProps) {
  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="tweet-input" className="block text-xs font-medium text-muted-foreground mb-3">
          ANALYZE TEXT
        </label>
        <textarea
          id="tweet-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your tweet or text here..."
          className="w-full h-48 p-4 bg-input text-foreground placeholder-muted-foreground/60 resize-none outline-none rounded-lg border border-border focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all duration-300 leading-relaxed"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          onClick={onAnalyze}
          disabled={isDisabled || isLoading}
          className="flex-1 h-11 rounded-lg font-medium bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing
            </>
          ) : (
            "Analyze"
          )}
        </Button>

        <Button
          onClick={onRandomTweet}
          variant="outline"
          className="flex-1 sm:flex-none h-11 rounded-lg font-medium bg-card text-foreground hover:bg-card/80 border-border/50 hover:border-accent/50 transition-all duration-300"
        >
          Random Tweet
        </Button>
      </div>
    </div>
  )
}
