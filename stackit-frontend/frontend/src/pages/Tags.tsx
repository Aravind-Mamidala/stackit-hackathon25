// @ts-nocheck
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Tag, TrendingUp, Users, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export function Tags() {
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('popular')

  useEffect(() => {
    // Simulate loading tags
    setTimeout(() => {
      const mockTags = [
        { name: 'react', count: 1250, questions: 890, followers: 2340 },
        { name: 'javascript', count: 2100, questions: 1567, followers: 3456 },
        { name: 'typescript', count: 890, questions: 567, followers: 1234 },
        { name: 'nodejs', count: 756, questions: 432, followers: 987 },
        { name: 'python', count: 1100, questions: 789, followers: 1678 },
        { name: 'vue', count: 456, questions: 234, followers: 567 },
        { name: 'angular', count: 345, questions: 189, followers: 432 },
        { name: 'mongodb', count: 678, questions: 345, followers: 789 },
        { name: 'postgresql', count: 432, questions: 234, followers: 456 },
        { name: 'docker', count: 567, questions: 298, followers: 654 },
        { name: 'kubernetes', count: 234, questions: 123, followers: 345 },
        { name: 'aws', count: 789, questions: 456, followers: 890 },
        { name: 'testing', count: 345, questions: 198, followers: 432 },
        { name: 'api', count: 567, questions: 345, followers: 678 },
        { name: 'security', count: 234, questions: 123, followers: 345 }
      ]
      setTags(mockTags)
      setLoading(false)
      toast.success('Tags loaded successfully!')
    }, 1000)
  }, [])

  const sortedTags = [...tags].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.count - a.count
      case 'questions':
        return b.questions - a.questions
      case 'followers':
        return b.followers - a.followers
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return b.count - a.count
    }
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center mb-4">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center shadow-lg mr-4"
          >
            <Tag className="text-white" size={32} />
          </motion.div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2">
          Popular Tags
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover the most popular tags and topics in our community. 
          Find questions by technology, framework, or topic.
        </p>
      </motion.div>

      {/* Sort Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex flex-wrap items-center justify-between bg-white rounded-xl p-4 shadow-lg border border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <div className="flex space-x-1">
              {[
                { key: 'popular', label: 'Popular', icon: TrendingUp },
                { key: 'questions', label: 'Questions', icon: MessageSquare },
                { key: 'followers', label: 'Followers', icon: Users },
                { key: 'name', label: 'Name', icon: Tag }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setSortBy(key)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    sortBy === key
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={14} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {tags.length} tags found
          </div>
        </div>
      </motion.div>

      {/* Tags Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {sortedTags.map((tag, index) => (
          <motion.div
            key={tag.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <Link 
                to={`/?tag=${tag.name}`}
                className="flex items-center space-x-2 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Tag className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {tag.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {tag.count.toLocaleString()} questions
                  </p>
                </div>
              </Link>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Questions</span>
                <span className="font-semibold text-gray-900">{tag.questions.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Followers</span>
                <span className="font-semibold text-gray-900">{tag.followers.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">This week</span>
                <span className="font-semibold text-green-600">+{Math.floor(Math.random() * 50) + 5}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                to={`/?tag=${tag.name}`}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 text-center block font-medium"
              >
                View Questions
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {tags.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Tag size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tags found</h3>
          <p className="text-gray-600">Be the first to create a tag!</p>
        </motion.div>
      )}
    </div>
  )
} 