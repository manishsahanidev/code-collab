# CodeCollab

CodeCollab is a full-stack web application that allows developers to create, share, and collaborate on code snippets. It provides a platform for storing, organizing, and sharing programming solutions, algorithms, and useful code fragments.

![CodeCollab Screenshot](https://placeholder-for-screenshot.com)

## Features

- **User Authentication**: Secure login and registration system
- **Code Snippet Management**: Create, read, update, and delete code snippets
- **Syntax Highlighting**: Support for multiple programming languages
- **Tagging System**: Organize snippets with custom tags
- **Like System**: Show appreciation for useful snippets
- **User Profiles**: Customize your developer profile
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend

- React 19
- TypeScript
- React Router v7
- CSS for styling

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication

## Project Structure

```
CodeCollab/
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── context/      # React context (auth, etc.)
│   │   ├── pages/        # Page components
│   │   ├── services/     # API service functions
│   │   └── styles/       # CSS stylesheets
│   └── public/           # Static assets
│
└── server/               # Backend Node.js API
    ├── src/
    │   ├── config/       # Configuration files
    │   ├── controllers/  # Route controllers
    │   ├── middleware/   # Express middleware
    │   ├── models/       # Mongoose models
    │   └── routes/       # API routes
    └── .env              # Environment variables (create this)
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local instance or MongoDB Atlas account)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/codecollab.git
   cd codecollab
   ```

2. **Setup environment variables**

   Create a `.env` file in the server directory:

   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/codecollab
   JWT_SECRET=your_jwt_secret_key
   ```

3. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```

4. **Install client dependencies**

   ```bash
   cd ../client
   npm install
   ```

5. **Run the development servers**

   In the server directory:

   ```bash
   npm run dev
   ```

   In the client directory:

   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000](http://localhost:5000)

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Snippets

- `GET /api/snippet` - Get all snippets
- `GET /api/snippet/:id` - Get a specific snippet
- `POST /api/snippet` - Create a new snippet (requires auth)
- `PUT /api/snippet/:id` - Update a snippet (requires auth)
- `DELETE /api/snippet/:id` - Delete a snippet (requires auth)
- `PUT /api/snippet/:id/like` - Like/unlike a snippet (requires auth)

### Users

- `GET /api/users/me` - Get current user profile (requires auth)
- `PUT /api/users/me` - Update user profile (requires auth)
- `GET /api/users/:id` - Get public user profile

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
