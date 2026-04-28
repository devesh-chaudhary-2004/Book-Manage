import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import BookCard from '../components/BookCard.jsx'
import BookForm from '../components/BookForm.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Modal from '../components/Modal.jsx'
import SearchBar from '../components/SearchBar.jsx'
import {
  createBook,
  deleteBook,
  getAllBooks,
  searchByAuthor,
  searchByTitle,
  toHumanError,
  updateBook,
} from '../services/bookService.js'

const emptyBook = { title: '', author: '', price: '', description: '' }

export default function BooksPage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [searchState, setSearchState] = useState({ type: 'title', query: '' })
  const [isSearchActive, setIsSearchActive] = useState(false)

  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [busyById, setBusyById] = useState({})

  const hasBooks = books && books.length > 0

  const fetchBooks = useCallback(async ({ type, query }) => {
    setLoading(true)
    setError('')

    try {
      const trimmed = query.trim()

      if (!trimmed) {
        const data = await getAllBooks()
        setBooks(Array.isArray(data) ? data : [])
        setIsSearchActive(false)
        return
      }

      const data =
        type === 'author' ? await searchByAuthor(trimmed) : await searchByTitle(trimmed)

      setBooks(Array.isArray(data) ? data : [])
      setIsSearchActive(true)
    } catch (err) {
      const msg = toHumanError(err)
      setError(msg)
      toast.error(msg)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }, [])

  const refresh = useCallback(async () => {
    await fetchBooks(searchState)
  }, [fetchBooks, searchState])

  useEffect(() => {
    fetchBooks({ type: 'title', query: '' })
  }, [fetchBooks])

  const emptyTitle = useMemo(() => {
    if (loading) return ''
    if (isSearchActive) return 'No books found'
    return 'No books yet'
  }, [isSearchActive, loading])

  const emptyDescription = useMemo(() => {
    if (loading) return ''
    if (isSearchActive) return 'Try a different search.'
    return 'Add your first book to get started.'
  }, [isSearchActive, loading])

  async function handleCreate(payload) {
    setSaving(true)
    try {
      await createBook(payload)
      toast.success('Book added')
      await refresh()
    } catch (err) {
      const msg = toHumanError(err)
      toast.error(msg)
    } finally {
      setSaving(false)
    }
  }

  async function handleUpdate(payload) {
    if (!editing?.id) return

    setSaving(true)
    try {
      await updateBook(editing.id, payload)
      toast.success('Book updated')
      setEditing(null)
      await refresh()
    } catch (err) {
      const msg = toHumanError(err)
      toast.error(msg)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(book) {
    const ok = window.confirm(`Delete "${book.title}"?`)
    if (!ok) return

    setBusyById((m) => ({ ...m, [book.id]: true }))

    try {
      await deleteBook(book.id)
      toast.success('Book deleted')
      await refresh()
    } catch (err) {
      const msg = toHumanError(err)
      toast.error(msg)
    } finally {
      setBusyById((m) => {
        const next = { ...m }
        delete next[book.id]
        return next
      })
    }
  }

  return (
    <div className="space-y-5">
      <SearchBar
        loading={loading}
        onSearch={({ type, query }) => {
          const next = { type, query }
          setSearchState(next)
          fetchBooks(next)
        }}
        onClear={() => {
          const next = { ...searchState, query: '' }
          setSearchState(next)
          fetchBooks(next)
        }}
      />

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50 to-orange-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60 lg:col-span-1">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500" />
          <h2 className="text-base font-semibold text-slate-900">Add book</h2>
          <div className="mt-4">
            <BookForm
              initialValues={emptyBook}
              onSubmit={handleCreate}
              submitLabel="Add"
              busy={saving}
              resetAfterSubmit
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          {loading ? (
            <div className="rounded-2xl bg-white p-8 text-sm text-slate-600 shadow-sm ring-1 ring-slate-200/60">
              <div className="h-2 w-32 rounded-full bg-slate-100" />
              <div className="mt-3 h-2 w-56 rounded-full bg-slate-100" />
              <div className="mt-3 h-2 w-44 rounded-full bg-slate-100" />
            </div>
          ) : hasBooks ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {books.map((b) => (
                <BookCard
                  key={b.id}
                  book={b}
                  deleting={Boolean(busyById[b.id])}
                  onEdit={setEditing}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <EmptyState title={emptyTitle} description={emptyDescription} />
          )}
        </div>
      </div>

      <Modal
        title="Edit book"
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
      >
        <BookForm
          initialValues={editing ?? emptyBook}
          submitLabel="Update"
          busy={saving}
          onCancel={() => setEditing(null)}
          onSubmit={handleUpdate}
        />
      </Modal>
    </div>
  )
}
