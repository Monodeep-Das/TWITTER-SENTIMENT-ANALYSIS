import os
import re
import joblib
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Define the stopword set manually to avoid downloading the heavy NLTK library
STOPWORDS = {
    "a", "about", "above", "after", "again", "against", "ain", "all", "am", "an", "and", "any", "are", "aren", "aren't", 
    "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can", "couldn", 
    "couldn't", "d", "did", "didn", "didn't", "do", "does", "doesn", "doesn't", "doing", "don", "don't", "down", "during", 
    "each", "few", "for", "from", "further", "had", "hadn", "hadn't", "has", "hasn", "hasn't", "have", "haven", "haven't", 
    "having", "he", "her", "here", "hers", "herself", "him", "himself", "his", "how", "i", "if", "in", "into", "is", "isn", 
    "isn't", "it", "it's", "its", "itself", "just", "ll", "m", "ma", "me", "mightn", "mightn't", "more", "most", "mustn", 
    "mustn't", "my", "myself", "needn", "needn't", "no", "nor", "not", "now", "o", "of", "off", "on", "once", "only", "or", 
    "other", "our", "ours", "ourselves", "out", "over", "own", "re", "s", "same", "shan", "shan't", "she", "she's", "should", 
    "should've", "shouldn", "shouldn't", "so", "some", "such", "t", "than", "that", "that'll", "the", "their", "theirs", 
    "them", "themselves", "then", "there", "these", "they", "this", "those", "through", "to", "too", "under", "until", 
    "up", "ve", "very", "was", "wasn", "wasn't", "we", "were", "weren", "weren't", "what", "when", "where", "which", 
    "while", "who", "whom", "why", "will", "with", "won", "won't", "wouldn", "wouldn't", "y", "you", "you'd", "you'll", 
    "you're", "you've", "your", "yours", "yourself", "yourselves"
}

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models using absolute paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, 'trained_model.sav')
vectorizer_path = os.path.join(BASE_DIR, 'vectorizer.sav')

model = joblib.load(model_path)
vectorizer = joblib.load(vectorizer_path)

@app.post("/api/predict")
async def predict(data: dict):
    text = data.get("text", "")
    
    # Cleaning Logic: Regex + Manual Stopword removal
    # Note: We removed the NLTK PorterStemmer to save space. 
    # If accuracy drops slightly, it's worth the trade-off for the 250MB limit.
    words = re.sub('[^a-zA-Z]', ' ', text).lower().split()
    cleaned = " ".join([word for word in words if word not in STOPWORDS])
    
    # ML Logic
    vectorized = vectorizer.transform([cleaned])
    prediction = model.predict(vectorized)
    
    # Confidence Score
    probabilities = model.predict_proba(vectorized)
    confidence = max(probabilities[0]) * 100
    
    return {
        "sentiment": "Positive" if prediction[0] == 1 else "Negative",
        "confidence": round(confidence, 2)
    }