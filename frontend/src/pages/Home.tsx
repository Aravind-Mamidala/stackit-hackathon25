// @ts-nocheck
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { mockAxios } from '../services/mockApi'
import { MessageSquare } from 'lucide-react'
import { FiltersBar } from '../components/FiltersBar'
import { QuestionItem } from '../components/QuestionItem'
import { Pagination } from '../components/Pagination'

interface Question {
  id: number
  title: string
  content: string
  views: number
  votes: number
  is_answered: boolean
  created_at: string
  user_id: number
  username: string
  reputation: number
  answer_count: number
  tags?: { name: string }[]
}

interface PaginationType {
  page: number
  limit: number
  total: number
  pages: number
}

export function Home() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [pagination, setPagination] = useState<PaginationType | null>(null)
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('newest')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  // Tag filter can be added as needed

  useEffect(() => {
    setPage(1)
  }, [sort, search])

  useEffect(() => {
    fetchQuestions(page)
  }, [sort, search, page])

  const fetchQuestions = async (pageToFetch = 1) => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: pageToFetch.toString(),
        limit: '10',
        sort,
        // tag: '', // Add tag filter if needed
        ...(search && { search })
      })
      const response = await mockAxios.get(`/api/questions?${params}`)
      if ('questions' in response.data && 'pagination' in response.data) {
        setQuestions(response.data.questions)
        setPagination(response.data.pagination)
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <FiltersBar
        sort={sort}
        setSort={setSort}
        search={search}
        setSearch={setSearch}
        onAsk={() => {}}
      />
      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((question) => (
          <QuestionItem key={question.id} question={question} />
        ))}
      </div>
      {/* Pagination */}
      {pagination && (
        <Pagination
          page={pagination.page}
          pages={pagination.pages}
          onPageChange={handlePageChange}
        />
      )}
      {questions.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
          <p className="text-gray-600">Be the first to ask a question!</p>
        </div>
      )}
    </div>
  )
} 