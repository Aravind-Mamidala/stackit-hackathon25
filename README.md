# StackIt - A Minimal Q&A Forum Platform

StackIt is a modern, full-stack question-and-answer platform built for collaborative learning and structured knowledge sharing. It's designed to be simple, user-friendly, and focused on the core experience of asking and answering questions within a community.

## 🚀 Features

### Core Features
- **Ask Questions**: Users can submit questions with titles, rich content, and tags
- **Answer Questions**: Provide detailed answers with voting system
- **Voting System**: Upvote/downvote questions and answers
- **User Authentication**: Secure JWT-based authentication
- **User Profiles**: View user activity, questions, and answers
- **Tag System**: Organize content with tags
- **Search & Filter**: Find questions by tags and sort by various criteria
- **Responsive Design**: Modern UI that works on all devices

### User Roles
- **Guest**: View all questions and answers
- **User**: Register, log in, post questions/answers, vote
- **Admin**: Moderate content, manage users

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **SQLite** database (easily migratable to PostgreSQL)
- **JWT** authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Lucide React** for icons
- **date-fns** for date formatting

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stackit-hackathon25
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in backend directory
   cd backend
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development servers**
   ```bash
   # From the root directory
   npm run dev
   ```

This will start:
- Backend server on http://localhost:3001
- Frontend development server on http://localhost:3000

## 🗄️ Database Setup

The application uses SQLite by default. The database will be automatically created when you first run the application.

### Database Schema
- **users**: User accounts and profiles
- **questions**: Questions with titles, content, and metadata
- **answers**: Answers linked to questions
- **votes**: Voting records for questions and answers
- **tags**: Tag definitions
- **question_tags**: Many-to-many relationship between questions and tags

## 🔧 Configuration

### Backend Environment Variables
Create a `.env` file in the `backend` directory:

```env
PORT=3001
JWT_SECRET=your-secret-key-here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend Configuration
The frontend is configured to proxy API requests to the backend during development. No additional configuration is needed.

## 📱 Usage

### For Users
1. **Register/Login**: Create an account or sign in
2. **Browse Questions**: View all questions on the home page
3. **Ask Questions**: Click "Ask Question" to submit a new question
4. **Answer Questions**: Provide helpful answers to questions
5. **Vote**: Upvote or downvote questions and answers
6. **Accept Answers**: Question authors can accept the best answer

### For Admins
- Manage user roles
- Moderate content
- View system statistics

## 🚀 Deployment

### Backend Deployment
1. Build the TypeScript code:
   ```bash
   cd backend
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

### Frontend Deployment
1. Build the React application:
   ```bash
   cd frontend
   npm run build
   ```

2. Serve the built files from a web server or CDN.

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting
- CORS protection
- Helmet.js security headers

## 🧪 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Questions
- `GET /api/questions` - List questions with pagination
- `GET /api/questions/:id` - Get single question
- `POST /api/questions` - Create new question
- `PUT /api/questions/:id` - Update question
- `DELETE /api/questions/:id` - Delete question
- `POST /api/questions/:id/vote` - Vote on question

### Answers
- `POST /api/answers` - Create new answer
- `PUT /api/answers/:id` - Update answer
- `DELETE /api/answers/:id` - Delete answer
- `POST /api/answers/:id/vote` - Vote on answer
- `POST /api/answers/:id/accept` - Accept answer

### Users
- `GET /api/users/:id` - Get user profile
- `GET /api/users/:id/stats` - Get user statistics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for Odoo Hackathon '25
- Inspired by Stack Overflow and similar Q&A platforms
- Uses modern web technologies for optimal performance and developer experience
