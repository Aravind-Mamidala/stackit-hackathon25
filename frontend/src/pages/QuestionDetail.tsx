import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { mockAxios } from '../services/mockApi'
import { Eye, ThumbsUp, CheckCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export function QuestionDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [question, setQuestion] = useState<any>(null)
  const [answers, setAnswers] = useState<any[]>([])
  const [newAnswer, setNewAnswer] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchQuestion()
  }, [id])

  const fetchQuestion = async () => {
    try {
          const response = await mockAxios.get(`/api/questions/${id}`)
    if ('question' in response.data && 'answers' in response.data) {
      setQuestion(response.data.question)
      setAnswers(response.data.answers)
    }
    } catch (error) {
      setError('Failed to load question')
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async (type: 'question' | 'answer', targetId: number, voteType: 'upvote' | 'downvote') => {
    try {
      await mockAxios.post(`/api/${type}s/${targetId}/vote`, { voteType })
      fetchQuestion() // Refresh to get updated votes
    } catch (error) {
      console.error('Vote failed:', error)
    }
  }

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAnswer.trim()) return

    try {
      await mockAxios.post('/api/answers', {
        content: newAnswer,
        questionId: parseInt(id!)
      })
      setNewAnswer('')
      fetchQuestion()
    } catch (error: any) {
      setError(error.message || 'Failed to post answer')
    }
  }

  const handleAcceptAnswer = async (answerId: number) => {
    try {
      await mockAxios.post(`/api/answers/${answerId}/accept`, {})
      fetchQuestion()
    } catch (error) {
      console.error('Failed to accept answer:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error || !question) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Question not found</h3>
        <Link to="/" className="text-primary-600 hover:text-primary-500">
          Back to questions
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Question */}
      <div className="card p-6 mb-8">
        <div className="flex items-start space-x-4">
          {/* Vote buttons */}
          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={() => handleVote('question', question.id, 'upvote')}
              className="text-gray-400 hover:text-primary-600"
            >
              <ThumbsUp size={20} />
            </button>
            <span className="font-medium text-gray-900">{question.votes}</span>
            <button
              onClick={() => handleVote('question', question.id, 'downvote')}
              className="text-gray-400 hover:text-red-600"
            >
              <ThumbsUp size={20} className="rotate-180" />
            </button>
          </div>

          {/* Question content */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{question.title}</h1>
            <div className="prose max-w-none mb-6">
              {question.content}
            </div>

            {/* Tags */}
            {question.tags && question.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {question.tags.map((tag: any) => (
                  <span
                    key={tag.name}
                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Question meta */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span>Asked {formatDistanceToNow(new Date(question.created_at), { addSuffix: true })}</span>
                <Link to={`/users/${question.user_id}`} className="hover:text-primary-600">
                  {question.username}
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <Eye size={16} />
                <span>{question.views} views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answers */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {answers.length} Answer{answers.length !== 1 ? 's' : ''}
        </h2>

        <div className="space-y-6">
          {answers.map((answer) => (
            <div key={answer.id} className="card p-6">
              <div className="flex items-start space-x-4">
                {/* Vote buttons */}
                <div className="flex flex-col items-center space-y-2">
                  <button
                    onClick={() => handleVote('answer', answer.id, 'upvote')}
                    className="text-gray-400 hover:text-primary-600"
                  >
                    <ThumbsUp size={20} />
                  </button>
                  <span className="font-medium text-gray-900">{answer.votes}</span>
                  <button
                    onClick={() => handleVote('answer', answer.id, 'downvote')}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <ThumbsUp size={20} className="rotate-180" />
                  </button>
                  {answer.is_accepted && (
                    <CheckCircle size={20} className="text-green-600" />
                  )}
                </div>

                {/* Answer content */}
                <div className="flex-1">
                  <div className="prose max-w-none mb-4">
                    {answer.content}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Answered {formatDistanceToNow(new Date(answer.created_at), { addSuffix: true })}</span>
                      <Link to={`/users/${answer.user_id}`} className="hover:text-primary-600">
                        {answer.username}
                      </Link>
                    </div>

                    {user && question.user_id === user.id && !question.is_answered && (
                      <button
                        onClick={() => handleAcceptAnswer(answer.id)}
                        className="btn btn-outline text-sm"
                      >
                        Accept Answer
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Answer form */}
      {user && (
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Your Answer</h3>
          <form onSubmit={handleSubmitAnswer}>
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              rows={6}
              className="input mb-4"
              placeholder="Write your answer here..."
              required
            />
            <button type="submit" className="btn btn-primary">
              Post Answer
            </button>
          </form>
        </div>
      )}

      {!user && (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Please log in to answer this question</p>
          <Link to="/login" className="btn btn-primary">
            Log In
          </Link>
        </div>
      )}
    </div>
  )
} 