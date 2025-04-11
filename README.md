# CodeCollab - Collaborative Code Snippet Manager

A modern web application for developers to share, manage, and collaborate on code snippets.

## Overview

CodeCollab allows developers to:

- Create and manage code snippets with proper syntax highlighting
- Categorize snippets with tags for easy retrieval
- Collaborate through comments, likes, and forking
- Receive real-time notifications for interactions
- Search through snippets by keywords or tags

## Tech Stack

### Frontend

- React.js with TypeScript
- Socket.io client for real-time features
- Prism.js for syntax highlighting

### Backend

- Node.js with Express.js
- TypeScript for type safety
- MongoDB with Mongoose ODM
- JWT for authentication
- Socket.io for real-time notifications
- Docker for containerization

## Project Structure

```
codecollab/
├── client/             # React frontend
├── server/             # Node.js backend
├── docker-compose.yml  # Docker configuration
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Docker (optional, for containerization)

### Installation

1. Clone the repository

2. Install dependencies and start the development servers

#### Backend

```bash
cd server
npm install
npm run dev
```

#### Frontend

```bash
cd client
npm install
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Features

- **User Authentication**: Secure login and registration with JWT
- **Snippet Management**: Create, edit, delete, and organize code snippets
- **Syntax Highlighting**: Support for multiple programming languages
- **Collaboration**: Comment, like, and fork snippets
- **Real-Time Notifications**: Get instant updates on interactions
- **Search & Filter**: Find snippets by tags, language, or content
- **Responsive Design**: Works on desktop and mobile devices

Snippets Simplified, Collaboration Amplified.
