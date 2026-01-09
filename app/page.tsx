"use client"

import { useState } from "react"
import Header from "@/components/header"
import InputSection from "@/components/input-section"
import ResultsPanel from "@/components/results-panel"
import Footer from "@/components/footer"

// Define the shape of our sentiment data
type SentimentResult = {
  sentiment: "positive" | "negative" | null
  confidence: number
}

export default function Home() {
  const [text, setText] = useState("")
  const [result, setResult] = useState<SentimentResult>({
    sentiment: null,
    confidence: 0,
  })
  const [isLoading, setIsLoading] = useState(false)

  const RENDER_API_URL =
    "https://twitter-sentiment-api.onrender.com/api/predict"

  const handleAnalyze = async () => {
    if (!text.trim()) return

    setIsLoading(true)
    setResult({ sentiment: null, confidence: 0 }) // Clear previous result

    try {
      const response = await fetch(RENDER_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error("Server is waking up or unavailable.")
      }

      const data = await response.json()

      setResult({
        sentiment: data.sentiment.toLowerCase() as "positive" | "negative",
        confidence: data.confidence || 0,
      })
    } catch (error) {
      console.error("Analysis Error:", error)
      alert(
        "Note: The free server takes ~50s to wake up if it hasn't been used recently. Please try again in a few moments!"
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleRandomTweet = () => {
    const sampleTweets = [
      // Very Positive
      "I absolutely love this product! Best purchase ever! 😍",
      "Amazing service and great customer support, highly recommended!",
      "The new update is a total game changer, everything works perfectly now!",
      "Feeling so blessed and grateful for the support from my community today.",
      "Just had the best cup of coffee of my life. What a great start to the day!",

      // Neutral / Informational
      "The conference starts tomorrow at 9 AM in the main auditorium.",
      "Just finished reading the latest research paper on Natural Language Processing.",
      "The weather forecast says it might rain later this afternoon.",
      "Is anyone else having trouble connecting to the Wi-Fi in the library?",
      "Checking out the new features of the Next.js 15 App Router.",

      // Sarcastic / Mixed
      "Oh great, another meeting that could have been an email. Just what I needed. 🙄",
      "I love it when my flight gets delayed for three hours for no reason.",
      "The food was okay, but the service was so slow I almost fell asleep.",
      "Wow, the instructions for this furniture are as clear as mud.",

      // Negative / Frustrated
      "This is the worst experience I have ever had. Completely disappointed.",
      "Terrible quality, waste of money. Never buying again.",
      "My laptop just crashed for the third time today. I'm losing all my work!",
      "The customer service was extremely rude and unhelpful. Avoid this place.",
      "I've been waiting for my order for three weeks and still nothing. Terrible.",
      "This app is so buggy it's almost impossible to use. Fix it already!",
      "Extremely frustrated with the constant delays. Zero stars if I could.",
    ]

    const randomTweet =
      sampleTweets[Math.floor(Math.random() * sampleTweets.length)]

    setText(randomTweet)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4 py-12 md:py-16">
        <div className="w-full max-w-2xl">
          {/* Input section for typing or generating random tweets */}
          <InputSection
            text={text}
            setText={setText}
            onAnalyze={handleAnalyze}
            onRandomTweet={handleRandomTweet}
            isLoading={isLoading}
            isDisabled={!text.trim()}
          />

          {/* Results Panel: Only shows when a sentiment result exists.
              The backend returns "Positive" which we've converted to lowercase "positive".
          */}
          {result.sentiment && (
            <ResultsPanel
              sentiment={result.sentiment}
              confidence={result.confidence}
            />
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
