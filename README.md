# Mini Auth & Notes App

A simple full-stack application for user authentication and notes management built with the MERN stack (MongoDB, Express.js, React/Next.js, Node.js) and JWT for authentication.

## Features
- User registration and login with JWT-based authentication
- Create, read, update, and delete (CRUD) private notes for authenticated users
- Password hashing with bcrypt
- Pagination for notes (`GET /api/notes?page=1&limit=10`)
- Search notes by title or content
- Protected routes for notes operations
- Basic frontend with Next.js for login, registration, and notes management

## Tech Stack
- **Frontend**: Next.js, React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT, bcrypt
- **HTTP Client**: Axios (frontend)

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Git (optional, for cloning the repo)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd mini-notes-app
```

### 2. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory based on `.env.example`:
   ```
   MONGO_URI=<mongo_URI>
   JWT_SECRET=<your_jwt_secret_here>
   PORT=5000
   ```
   - Replace `MONGO_URI` with your MongoDB connection string.
   - Set a secure `JWT_SECRET` (e.g., a random string).
4. Start the backend server:
   ```bash
   npm start
   ```
   The backend runs on `http://localhost:5000` by default.

### 3. Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update API base URL in `app/login/page.js`, `app/register/page.js`, and `app/dashboard/page.js` if your backend is not running on `http://localhost:5000`.
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend runs on `http://localhost:3000`.

### 4. Database Setup
- Use MongoDB Atlas for a free cloud database or set up MongoDB locally.
- Ensure the `MONGO_URI` in the `.env` file points to your database.

## Usage
1. Open `http://localhost:3000` in your browser.
2. Register a new account or log in with existing credentials.
3. On the dashboard, you can:
   - Add a new note
   - View your notes (with pagination)
   - Edit or delete existing notes
   - Search notes by title or content
   - Log out

## API Endpoints
- **POST /api/register**: Register a new user (username, password)
- **POST /api/login**: Log in and receive a JWT
- **GET /api/notes?page=<page>&limit=<limit>&search=<keyword>**: Get paginated notes (protected)
- **POST /api/notes**: Create a new note (protected)
- **PUT /api/notes/:id**: Update a note (protected)
- **DELETE /api/notes/:id**: Delete a note (protected)

## Deployment
- **Backend**: Deploy to Render, Railway, or Heroku. Set environment variables in the hosting platform.
- **Frontend**: Deploy to Vercel. Update API URLs in frontend code to point to the deployed backend.
- **Database**: MongoDB Atlas is recommended for cloud hosting.

## Notes
- JWT is stored in `localStorage` for simplicity. For production, consider using secure cookies.
- Basic styling is applied; enhance with Tailwind CSS or other frameworks as needed.
- Error handling and HTTP status codes are implemented for all API routes.
- Bonus features (pagination, search) are included in the backend and frontend.

## Troubleshooting
- Ensure MongoDB is running and `MONGO_URI` is correct.
- Check console logs for errors if the backend or frontend fails to start.
- Verify `JWT_SECRET` is set and consistent across requests.
- If deploying, ensure CORS allows your frontend URL.