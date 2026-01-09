🐦 Twitter Sentiment Analysis
A full-stack web application that predicts the sentiment of tweets using a Logistic Regression machine learning model. The project features a modern Next.js frontend and a FastAPI backend, deployed as a monorepo on Vercel.

🚀 Features
Real-time Prediction: Analyze tweet sentiment (Positive/Negative) instantly.

Confidence Scoring: Displays the mathematical probability of the prediction using predict_proba.

Hybrid Architecture: Combines the speed of a React-based frontend with the ML power of Python.

Responsive UI: Built with Tailwind CSS and Lucide icons for a clean, modern look.

Random Tweet Generator: Quickly test the model with pre-loaded sample data.

🛠️ Tech Stack
Frontend
Framework: Next.js 15+ (App Router).

Styling: Tailwind CSS.

Icons: Lucide React.

Language: TypeScript.

Backend
Framework: FastAPI.

ML Libraries: Scikit-Learn, NLTK, Pandas, NumPy.

Server: Uvicorn.

📂 Project Structure
Plaintext

├── api/                    # Python FastAPI Backend
│   ├── index.py            # Main API logic & ML routes
│   ├── trained_model.sav   # Serialized Logistic Regression model
│   └── vectorizer.sav      # TF-IDF Vectorizer
├── app/                    # Next.js App Router (Frontend)
├── components/             # Reusable React components
├── requirements.txt        # Python dependencies
├── vercel.json             # Deployment configuration
└── package.json            # Node.js dependencies
⚙️ Local Setup
1. Clone the repository
Bash

git clone https://github.com/yourusername/twitter-sentiment-analysis.git
cd twitter-sentiment-analysis
2. Setup the Python Backend
It is highly recommended to use a virtual environment.

Bash

# Create and activate venv
python -m venv .venv
source .venv/Scripts/activate  # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn api.index:app --reload --port 8000
3. Setup the Next.js Frontend
Open a new terminal window:

Bash

# Install dependencies
npm install

# Run the development server
npm run dev
Visit http://localhost:3000 to view the app.

🧠 Model Information
The sentiment analysis model was trained on the Sentiment140 dataset containing 1.6 million tweets.

Algorithm: Logistic Regression.

Preprocessing: Stopword removal and Porter Stemming (via NLTK).

Feature Extraction: TF-IDF Vectorization.

☁️ Deployment
This project is configured for Vercel. The vercel.json file handles routing traffic from /api to the Python serverless functions.

📄 License
This project is for educational purposes.