# AI PDF Chatbot (RAG Based)

An AI-powered PDF chatbot built using Retrieval-Augmented Generation (RAG).  
Users can upload PDF files and ask questions related to the uploaded document. The chatbot extracts text, creates embeddings, stores them in a vector database, and generates contextual answers using AI.

---

# Features

- Upload PDF documents
- Extract text from PDFs
- Text chunking using LangChain
- Embeddings using HuggingFace
- Vector storage using FAISS
- Semantic search
- AI-generated answers
- FastAPI backend
- React frontend
- Real-time chatbot UI

---

# Tech Stack

## Frontend
- React.js
- Vite
- Axios
- CSS

## Backend
- FastAPI
- Python
- LangChain
- HuggingFace Embeddings
- FAISS
- PyPDF

---

# Project Structure

```bash
Chatbot/
│
├── Backend/
│   ├── main.py
│   ├── requirement.txt
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── .gitignore
├── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/ChatbotAI.git

cd ChatbotAI
```

---

# Backend Setup

```bash
cd Backend

python -m venv venv

# Linux / Mac
source venv/bin/activate

# Windows
venv\Scripts\activate

pip install -r requirement.txt

uvicorn main:app --reload
```

Backend runs on:

```bash
http://localhost:8000
```

---

# Frontend Setup

```bash
cd Frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Environment Variables

Create `.env` file inside Backend folder:

```env
OPENAI_API_KEY=your_api_key
```

---

# API Endpoints

## Upload PDF

```http
POST /upload
```

## Ask Question

```http
POST /chat
```

---

# Future Improvements

- Multiple PDF support
- Chat history
- Authentication
- Streaming responses
- Cloud vector database
- Deployment support

---

# Author

Sahil Yadav

```