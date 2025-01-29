import os
import glob
import numpy as np
import PyPDF2
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.probability import FreqDist
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
nltk.download('punkt')
nltk.download('stopwords')

def remove_stopwords(text):
    stop_words = set(stopwords.words('english'))
    words = word_tokenize(text.lower())
    filtered_words = [word for word in words if word.isalnum() and word not in stop_words]
    return filtered_words

def load_extracted_text(destination_folder):
    print(f"Looking for extracted files in: {destination_folder}")
    all_texts = []
    for file_path in glob.glob(f"{destination_folder}/*_extracted.txt"):
        with open(file_path, "r", encoding="utf-8") as file:
            text = file.read().strip()
            if text:
                all_texts.append(text)
            else:
                print(f"Skipping empty file: {file_path}")
    if not all_texts:
        print("No text files found!")
    return all_texts

def extract_topics_from_syllabus(syllabus_path, top_n=10):
    syllabus_text = ""
    with open(syllabus_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            syllabus_text += page.extract_text() or ""  
    if not syllabus_text.strip():
        print("No text extracted from the syllabus PDF!")
        return []
    cleaned_text = " ".join(remove_stopwords(syllabus_text))
    words = word_tokenize(cleaned_text.lower())
    words = [word for word in words if word.isalnum()]  
    freq_dist = FreqDist(words)
    topics = [word for word, _ in freq_dist.most_common(top_n)]
    return topics

def match_text_to_topics(all_texts, topics):
    vectorizer = TfidfVectorizer()
    topic_vectors = vectorizer.fit_transform([" ".join(topics)])
    text_vectors = vectorizer.transform(all_texts)
    topic_weights = cosine_similarity(text_vectors, topic_vectors).flatten()
    return topic_weights

def rank_topics(all_texts, topics):
    topic_counts = {topic: 0 for topic in topics}
    
    for text in all_texts:
        for topic in topics:
            if topic in text.lower():
                topic_counts[topic] += 1
    
    ranked_topics = sorted(topic_counts.items(), key=lambda x: x[1], reverse=True)
    return ranked_topics

def analyze_past_papers(destination_folder, syllabus_path):
    all_texts = load_extracted_text(destination_folder)
    topics = extract_topics_from_syllabus(syllabus_path)
    topic_weights = match_text_to_topics(all_texts, topics)
    ranked_topics = rank_topics(all_texts, topics)
    print("Topic Importance Ranking:")
    for topic, count in ranked_topics:
        print(f"{topic}: {count} occurrences")
    return ranked_topics


