import os
##import pickle
import re
import nltk
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from nltk.stem.porter import PorterStemmer
import joblib
# 1. Setup NLTK data path for Vercel
# This tells NLTK to look in a writable directory
nltk_data_path = os.path.join("/tmp", "nltk_data")
if not os.path.exists(nltk_data_path):
    os.makedirs(nltk_data_path)
nltk.data.path.append(nltk_data_path)
nltk.download('stopwords', download_dir=nltk_data_path)

from nltk.corpus import stopwords

app = FastAPI()

# 2. Update CORS for both local and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For production, you can change this to your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Use Absolute Paths for loading models
# This ensures Vercel can find the .sav files regardless of the working directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, 'trained_model.sav')
vectorizer_path = os.path.join(BASE_DIR, 'vectorizer.sav')

model = joblib.load(open(model_path, 'rb'))
vectorizer = joblib.load(open(vectorizer_path, 'rb'))
port_stem = PorterStemmer()

@app.post("/api/predict")
async def predict(data: dict):
    text = data.get("text", "")
    
    # 4. Cleaning and Stemming logic
    # We filter out stopwords here for better accuracy
    stop_words = set(stopwords.words('english'))
    cleaned_text = re.sub('[^a-zA-Z]', ' ', text).lower().split()
    stemmed = " ".join([port_stem.stem(word) for word in cleaned_text if word not in stop_words])
    
    # 5. ML Logic
    vectorized = vectorizer.transform([stemmed])
    prediction = model.predict(vectorized)
    
    # 6. Confidence Score
    probabilities = model.predict_proba(vectorized)
    confidence = max(probabilities[0]) * 100
    
    return {
        "sentiment": "Positive" if prediction[0] == 1 else "Negative",
        "confidence": round(confidence, 2)
    }