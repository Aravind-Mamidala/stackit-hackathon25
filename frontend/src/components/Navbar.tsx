import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { LogOut, User, Plus, Home } from 'lucide-react'

export function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">StackIt</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link to="/demo" className="text-gray-600 hover:text-gray-900">
              Demo
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/ask" 
                  className="flex items-center space-x-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                >
                  <Plus size={20} />
                  <span>Ask Question</span>
                </Link>
                
                <div className="flex items-center space-x-4">
                  <Link 
                    to={`/users/${user.id}`} 
                    className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                  >
                    <User size={20} />
                    <span>{user.username}</span>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 