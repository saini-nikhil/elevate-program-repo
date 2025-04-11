# Employee Management System

A full-stack web application for managing employee data with secure authentication and CRUD operations.

## Features

- User authentication (signup, login, profile)
- Employee management (create, read, update, delete)
- Profile picture upload and storage
- Responsive design for all devices
- Secure API with JWT authentication

## Tech Stack

### Frontend
- React 19
- Redux Toolkit for state management
- React Router Dom for navigation
- Axios for API requests
- Vite as the build tool

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads
- Cloudinary for image storage

## Project Structure

```
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── contexts/       # React contexts
│   │   ├── utils/          # Utility functions
│   │   ├── styles/         # CSS styles
│   │   ├── App.jsx         # Main component
│   │   └── routes.js       # Application routes
│   └── package.json        # Frontend dependencies
│
└── backend/                # Express backend
    ├── config/             # Configuration files
    ├── controllers/        # Request handlers
    ├── middlewares/        # Custom middlewares
    ├── models/             # Database models
    ├── routes/             # API routes
    ├── uploads/            # Local file storage
    └── server.js           # Entry point
```

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
4. Start the server:
   ```
   node server.js
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/profile` - Get user profile

### Employee Management
- `GET /api/employees` - Get all employees
- `GET /api/employee/:id` - Get employee by ID
- `POST /api/employee` - Create a new employee
- `PUT /api/employee/:id` - Update an employee
- `DELETE /api/employee/:id` - Delete an employee


 
