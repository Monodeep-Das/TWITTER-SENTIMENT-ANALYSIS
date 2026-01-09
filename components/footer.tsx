export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-8 mt-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-muted-foreground">
          <a
            href="https://www.kaggle.com/datasets/kazanova/sentiment140"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-300"
          >
            Sentiment140 Dataset
          </a>
          <span className="hidden sm:block w-px h-4 bg-border/50"></span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-300"
          >
            GitHub Repository
          </a>
        </div>
      </div>
    </footer>
  )
}
