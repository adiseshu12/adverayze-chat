# Adverayze Chat App

Full-stack chat app with:
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)

## Features

- Send messages
- View live-updating chat (polling)
- Pin / unpin messages
- Delete message for me
- Delete message for everyone

## Project Structure

- `backend/` - Express API and MongoDB models
- `frontend/` - React UI

## Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB Atlas connection string

## Backend Setup

1. Go to backend folder:
   - `cd backend`
2. Install dependencies:
   - `npm install`
3. Create/update `.env`:
   - `MONGO_URI=<your-mongodb-connection-string>`
   - `PORT=5050`
4. Start backend:
   - `node index.js`

You should see:
- `Server running on port 5050`
- `MongoDB connected`

## Frontend Setup

1. Open new terminal and go to frontend folder:
   - `cd frontend`
2. Install dependencies:
   - `npm install`
3. Start frontend:
   - `npm run dev`
4. Open:
   - `http://localhost:5173`

Frontend uses:
- `VITE_API_URL` if set
- otherwise default: `http://localhost:5050/api/messages`

## API Endpoints

Base URL: `http://localhost:5050/api/messages`

- `GET /` - fetch all messages
- `POST /` - send a message
- `PATCH /:id/pin` - toggle pin
- `PATCH /:id/delete` - delete for me/everyone

## Troubleshooting

- If messages are not sending, confirm backend runs on `5050`.
- On some macOS setups, port `5000` may already be occupied (Control Center / AirTunes).
- If needed, change backend `PORT` in `backend/.env` and update frontend API URL accordingly.
