# 🎓 Academic Verify – Authenticity Validator for Academia

Academic Verify is a **certificate and degree verification portal** that helps institutions, employers, and government bodies **detect fake or tampered academic certificates**.  
It provides a secure, scalable, and easy-to-use system to validate credentials against official records.

---

## 🚀 Features

- ✅ **Upload & Verify**: Upload scanned certificates (PDF/Image) or enter certificate ID.
- 🔍 **OCR-based Extraction**: Automatically extract key fields (Name, Roll No, Certificate ID, Course, Grades).
- 🏫 **Institution Integration**: Universities/colleges can upload bulk records or sync in real time.
- 🔐 **Forgery Detection**:
  - Tampered photos, seals, or signatures
  - Invalid/duplicate certificate numbers
  - Non-existent institutions or courses
- 📊 **Admin Dashboard**:
  - Track verification activity
  - Flag anomalies
  - Manage blacklists
- 🧾 **Verification Report**: Downloadable status report for employers and agencies.
- 🔗 **Future-ready**: Supports QR codes, digital watermarks, and blockchain verification.

---

## 🛠️ Tech Stack

**Frontend**:  
- React.js, Tailwind CSS  
- Recharts / Chart.js for dashboards  

**Backend**:  
- Node.js (Express/NestJS) for APIs  
- Python (FastAPI) for OCR & AI services  

**AI / OCR**:  
- Tesseract OCR / Google Vision API  
- OpenCV, PyTorch for tamper detection  

**Database & Storage**:  
- PostgreSQL / MySQL  
- Elasticsearch (for fast lookup & fuzzy search)  
- AWS S3 / MinIO for file storage  

**Security & Verification**:  
- JWT & OAuth2.0 (Role-based access)  
- PKI / QR-code based verification  
- Blockchain anchoring (Hyperledger Fabric)  

**Deployment**:  
- Docker, Kubernetes  
- CI/CD: GitHub Actions  

---

## 📂 Project Structure

```

Academic\_verify/
│── frontend/          # React-based UI
│── backend/           # Node.js / FastAPI services
│── models/            # ML models for OCR & forgery detection
│── scripts/           # Data ingestion & utilities
│── docs/              # Documentation
│── README.md          # Project info

````

---

## ⚡ Getting Started

### Prerequisites
- Node.js (v18+)
- Python 3.10+
- PostgreSQL
- Docker (optional for deployment)

### Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/JyoshikaLalam/Academic_verify.git
   cd Academic_verify
````

2. **Install dependencies**

   * Backend:

     ```bash
     cd backend
     npm install
     ```
   * Frontend:

     ```bash
     cd frontend
     npm install
     ```
   * Python services:

     ```bash
     pip install -r requirements.txt
     ```

3. **Configure environment**

   * Copy `.env.example` → `.env`
   * Set database URL, storage paths, API keys

4. **Run locally**

   ```bash
   # Start backend
   npm run dev

   # Start frontend
   npm start

   # Run Python OCR service
   uvicorn app.main:app --reload
   ```

---

## 📊 Roadmap

* [x] Basic certificate upload & verification
* [x] OCR text extraction
* [ ] Signature/seal forgery detection
* [ ] Blockchain-based certificate anchoring
* [ ] Mobile app (React Native)

