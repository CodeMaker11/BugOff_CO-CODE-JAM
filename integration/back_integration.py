from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import shutil
import os
import zipfile
import uuid
from fastapi.middleware.cors import CORSMiddleware
from features.analysis import analyze_past_papers  
from features.text_extraction import zip_file_extraction 

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
analysis_results = {}

@app.post("/upload/")
async def upload_files(papers: UploadFile = File(...), syllabus: UploadFile = File(...)):
    try:
        if not (papers.filename.endswith('.zip') and syllabus.filename.endswith('.pdf')):
            raise HTTPException(status_code=400, detail="Invalid file type. Upload .zip for past papers and .pdf for syllabus.")
        
        file_id = str(uuid.uuid4())  
        zip_path = os.path.join(UPLOAD_FOLDER, f"{file_id}.zip")
        with open(zip_path, "wb") as buffer:
            shutil.copyfileobj(papers.file, buffer)
        syllabus_path = os.path.join(UPLOAD_FOLDER, f"{file_id}_syllabus.pdf")
        with open(syllabus_path, "wb") as buffer:
            shutil.copyfileobj(syllabus.file, buffer)
        extract_folder = os.path.join(UPLOAD_FOLDER, file_id)
        os.makedirs(extract_folder, exist_ok=True)
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(extract_folder)
        zip_file_extraction(zip_path, extract_folder)
        ranked_topics = analyze_past_papers(extract_folder, syllabus_path)
        analysis_results[file_id] = {"file_id": file_id, "ranked_topics": ranked_topics}
        return JSONResponse(content=analysis_results[file_id])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))