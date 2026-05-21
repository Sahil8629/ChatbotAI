# from fastapi import FastAPI, UploadFile, File
# from fastapi.middleware.cors import CORSMiddleware
# import shutil
# from pypdf import PdfReader

# from langchain_text_splitters import RecursiveCharacterTextSplitter
# from langchain_community.embeddings import HuggingFaceEmbeddings
# from langchain_community.vectorstores import FAISS
# from langchain_google_genai import ChatGoogleGenerativeAI

# from dotenv import load_dotenv
# import os

# # Load environment variables
# load_dotenv()

# # FastAPI app
# app = FastAPI()

# # Enable CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Global vector store
# vector_store = None


# @app.get("/")
# def home():
#     return {
#         "message": "AI PDF Chatbot Backend Running"
#     }


# @app.post("/upload-pdf")
# async def upload_pdf(file: UploadFile = File(...)):

#     global vector_store

#     # Create uploads folder
#     os.makedirs("uploads", exist_ok=True)

#     # Save uploaded PDF
#     file_path = f"uploads/{file.filename}"

#     with open(file_path, "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)

#     # Read PDF
#     reader = PdfReader(file_path)

#     text = ""

#     for page in reader.pages:
#         extracted_text = page.extract_text()

#         if extracted_text:
#             text += extracted_text

#     # Split text into chunks
#     text_splitter = RecursiveCharacterTextSplitter(
#         chunk_size=500,
#         chunk_overlap=50
#     )

#     chunks = text_splitter.split_text(text)

#     # Create embeddings using HuggingFace
#     embeddings = HuggingFaceEmbeddings(
#         model_name="sentence-transformers/all-MiniLM-L6-v2"
#     )

#     # Store embeddings in FAISS
#     vector_store = FAISS.from_texts(
#         chunks,
#         embeddings
#     )

#     return {
#         "message": "PDF uploaded and processed successfully",
#         "total_chunks": len(chunks)
#     }


# @app.post("/ask")
# async def ask_question(question: str):

#     global vector_store

#     # Check if PDF uploaded
#     if vector_store is None:
#         return {
#             "error": "Please upload a PDF first"
#         }

#     # Similarity search
#     docs = vector_store.similarity_search(
#         question,
#         k=3
#     )

#     # Combine context
#     context = ""

#     for doc in docs:
#         context += doc.page_content + "\n"

#     # Gemini model
#     llm = ChatGoogleGenerativeAI(
#         model="gemini-1.5-flash",
#         temperature=0.3
#     )

#     # Prompt
#     prompt = f"""
#     Answer the question only from the provided context.

#     Context:
#     {context}

#     Question:
#     {question}
#     """

#     # Generate response
#     response = llm.invoke(prompt)

#     return {
#         "question": question,
#         "answer": response.content
#     }

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from pypdf import PdfReader
import shutil
import os

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI

# =========================
# LOAD ENV VARIABLES
# =========================
load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY not found in .env file")

# =========================
# FASTAPI APP
# =========================
app = FastAPI()

# =========================
# CORS
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://chatbot-ai-ten-alpha.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# GLOBAL VECTOR STORE
# =========================
vector_store = None

# =========================
# HOME ROUTE
# =========================
@app.get("/")
def home():
    return {
        "message": "AI PDF Chatbot Backend Running"
    }

# =========================
# UPLOAD PDF
# =========================
@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):

    global vector_store

    try:

        # Create uploads folder
        os.makedirs("uploads", exist_ok=True)

        # Save PDF
        file_path = f"uploads/{file.filename}"

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Read PDF
        reader = PdfReader(file_path)

        text = ""

        for page in reader.pages:
            extracted_text = page.extract_text()

            if extracted_text:
                text += extracted_text

        # Check empty PDF
        if text.strip() == "":
            return {
                "error": "No text found in PDF"
            }

        # Split text
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=50
        )

        chunks = text_splitter.split_text(text)

        # Embeddings
        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

        # FAISS vector store
        vector_store = FAISS.from_texts(
            chunks,
            embeddings
        )

        return {
            "message": "PDF uploaded successfully",
            "total_chunks": len(chunks)
        }

    except Exception as e:
        return {
            "error": str(e)
        }

# =========================
# ASK QUESTION
# =========================
@app.post("/ask")
async def ask_question(question: str):

    global vector_store

    try:

        # Check PDF uploaded
        if vector_store is None:
            return {
                "error": "Please upload PDF first"
            }

        # Similarity Search
        docs = vector_store.similarity_search(
            question,
            k=3
        )

        # Context build
        context = ""

        for doc in docs:
            context += doc.page_content + "\n"

        # Gemini LLM
        llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",
            google_api_key=GOOGLE_API_KEY,
            temperature=0.3
        )

        # Prompt
        prompt = f"""
        You are a helpful AI assistant.

        Answer ONLY from the given context.

        Context:
        {context}

        Question:
        {question}
        """

        # Generate answer
        response = llm.invoke(prompt)

        return {
            "question": question,
            "answer": response.content
        }

    except Exception as e:
        return {
            "error": str(e)
        }