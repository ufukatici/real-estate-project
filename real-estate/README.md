# Real Estate Platform

A full-stack real estate listing platform with Django backend and Next.js frontend.

## Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8005
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Backend runs on http://localhost:8005
Frontend runs on http://localhost:3007

## Database

Uses SQLite database (`db.sqlite3`). Run `python manage.py migrate` to create tables.

