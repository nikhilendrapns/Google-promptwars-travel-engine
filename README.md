# Vagabond AI - Travel Intelligence Engine

A lightweight, full-stack travel planning application optimized for Google Cloud Platform.

## 🚀 Architecture
- **Frontend**: React + Vite (Firebase Hosting)
- **Backend**: Node.js + Express (Cloud Run)
- **Infrastructure**: Serverless, low-cost GCP stack.

## 📂 Project Structure
- `/frontend`: React application and Firebase configuration.
- `/backend`: Express API, caching logic, and Dockerfile for Cloud Run.

## 🛠️ Local Development

### Backend
1. `cd backend`
2. `npm install`
3. `npm start` (Runs on http://localhost:8080)

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## ☁️ Deployment

### Backend (Cloud Run)
```bash
cd backend
gcloud run deploy --source .
```

### Frontend (Firebase Hosting)
```bash
cd frontend
npm run build
firebase deploy
```

## 🔐 Environment Variables
- `WEATHER_API_KEY`: OpenWeatherMap API Key (optional, defaults to mock data).
- `VITE_API_URL`: Backend URL for the frontend.
