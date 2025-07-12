// @ts-nocheck
import { Link } from 'react-router-dom'

export function QuestionItem({ question }) {
  return (
    <div className="card p-6 flex items-start space-x-4">
      {/* Answer count badge */}
      <div className="flex flex-col items-center mr-4">
        <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-bold mb-2">
          {question.answer_count} ans
        </span>
      </div>
      {/* Main content */}
      <div className="flex-1">
        <Link to={`/questions/${question.id}`} className="text-lg font-semibold text-gray-900 hover:text-primary-600">
          {question.title}
        </Link>
        <div className="flex flex-wrap gap-2 mt-2 mb-2">
          {question.tags && question.tags.map((tag, i) => (
            <span key={i} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">{tag.name}</span>
          ))}
        </div>
        <div className="text-sm text-gray-600 mb-2 line-clamp-2">
          {question.content.replace(/<[^>]*>/g, '').substring(0, 200)}...
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <span className="mr-2">User Name</span>
          <span>{question.username}</span>
        </div>
      </div>
    </div>
  )
} 