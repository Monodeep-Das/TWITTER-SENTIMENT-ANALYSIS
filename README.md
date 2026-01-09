# 🐦 Twitter Sentiment Analysis

A full-stack web application that predicts the **sentiment of tweets** using a **Logistic Regression** machine learning model.  
The project uses a **modern Next.js frontend** and a **FastAPI backend**, deployed as a **monorepo on Vercel**.

---

## 🚀 Features

- **Real-time Prediction**  
  Instantly analyze tweet sentiment as **Positive** or **Negative**.

- **Confidence Scoring**  
  Displays prediction probability using `predict_proba` from Scikit-Learn.

- **Hybrid Architecture**  
  Combines a fast React-based frontend with a Python-powered ML backend.

- **Responsive UI**  
  Built with **Tailwind CSS** and **Lucide Icons** for a clean, modern interface.

- **Random Tweet Generator**  
  Quickly test the model using pre-loaded sample tweets.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React

### Backend
- **Framework:** FastAPI
- **ML Libraries:** Scikit-Learn, NLTK, Pandas, NumPy
- **Server:** Uvicorn

---

## 📂 Project Structure

```

├── api/                    # FastAPI backend
│   ├── index.py            # Main API logic & ML routes
│   ├── trained_model.sav   # Serialized Logistic Regression model
│   └── vectorizer.sav      # TF-IDF Vectorizer
├── app/                    # Next.js App Router (Frontend)
├── components/             # Reusable React components
├── requirements.txt        # Python dependencies
├── vercel.json             # Vercel deployment configuration
└── package.json            # Node.js dependencies

````

---

## ⚙️ Local Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/twitter-sentiment-analysis.git
cd twitter-sentiment-analysis
````

---

### 2️⃣ Setup the Python Backend

It is recommended to use a **virtual environment**.

```bash
# Create and activate virtual environment
python -m venv .venv
source .venv/Scripts/activate   # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn api.index:app --reload --port 8000
```

---

### 3️⃣ Setup the Next.js Frontend

Open a **new terminal window**:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Visit: **[http://localhost:3000](http://localhost:3000)**

---

## 🧠 Model Information

* **Dataset:** Sentiment140 (1.6 million tweets)
* **Algorithm:** Logistic Regression
* **Text Preprocessing:**

  * Stopword Removal
  * Porter Stemming (NLTK)
* **Feature Extraction:** TF-IDF Vectorization

---

## ☁️ Deployment

This project is configured for **Vercel**.

* The `vercel.json` file routes `/api` requests to FastAPI serverless functions.
* Frontend and backend are deployed together as a **monorepo**.

---

## 📄 License

This project is for **educational purposes only**.

---

## ⭐ Acknowledgements

* Kaggle – Sentiment140 Dataset
* Scikit-Learn & FastAPI Documentation

---

If you like this project, feel free to ⭐ the repository!
