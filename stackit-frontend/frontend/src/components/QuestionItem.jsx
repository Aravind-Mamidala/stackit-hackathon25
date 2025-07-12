// @ts-nocheck
import { Link } from 'react-router-dom'
import { Eye, ThumbsUp, MessageSquare, Clock, User, CheckCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { motion } from 'framer-motion'

export function QuestionItem({ question }) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="card p-6 shadow-lg border-0 hover:shadow-xl transition-all duration-200"
    >
      <div className="flex items-start space-x-6">
        {/* Stats Column */}
        <div className="flex flex-col items-center space-y-2 min-w-[80px]">
          <div className="flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 w-full">
            <ThumbsUp size={16} className="text-blue-600 mb-1" />
            <span className="text-lg font-bold text-blue-900">{question.votes}</span>
            <span className="text-xs text-blue-600">votes</span>
          </div>
          
          <div className="flex flex-col items-center bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 w-full">
            <MessageSquare size={16} className="text-green-600 mb-1" />
            <span className="text-lg font-bold text-green-900">{question.answer_count}</span>
            <span className="text-xs text-green-600">answers</span>
          </div>
          
          <div className="flex flex-col items-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 w-full">
            <Eye size={16} className="text-gray-600 mb-1" />
            <span className="text-lg font-bold text-gray-900">{question.views}</span>
            <span className="text-xs text-gray-600">views</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Title and Status */}
          <div className="flex items-start justify-between mb-3">
            <Link 
              to={`/questions/${question.id}`} 
              className="text-xl font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2"
            >
              {question.title}
            </Link>
            {question.is_answered && (
              <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium ml-3">
                <CheckCircle size={12} />
                <span>Answered</span>
              </div>
            )}
          </div>

          {/* Content Preview */}
          <p className="text-gray-600 mb-4 line-clamp-2">
            {question.content.replace(/<[^>]*>/g, '').substring(0, 200)}
            {question.content.length > 200 && '...'}
          </p>

          {/* Tags */}
          {question.tags && question.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {question.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 border border-primary-300 hover:from-primary-200 hover:to-primary-300 transition-all duration-200"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>Asked {formatDistanceToNow(new Date(question.created_at), { addSuffix: true })}</span>
              </div>
              <Link 
                to={`/users/${question.user_id}`}
                className="flex items-center space-x-1 hover:text-primary-600 transition-colors"
              >
                <User size={14} />
                <span className="font-medium">{question.username}</span>
                <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                  {question.reputation}
                </span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-2">
              {question.is_answered && (
                <div className="flex items-center space-x-1 text-green-600">
                  <CheckCircle size={14} />
                  <span className="text-xs">Solved</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 