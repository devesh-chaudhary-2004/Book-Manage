import { useState } from 'react'

export default function SearchBar({ onSearch, onClear, loading }) {
  const [type, setType] = useState('title')
  const [query, setQuery] = useState('')

  function submit(e) {
    e.preventDefault()
    onSearch({ type, query })
  }

  return (
    <form
      onSubmit={submit}
      className="flex w-full flex-col gap-3 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-200/60 backdrop-blur sm:flex-row sm:items-center"
    >
      <div className="flex flex-1 gap-3">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-32 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
          aria-label="Search type"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search by ${type}...`}
          className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Search
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => {
            setQuery('')
            onClear?.()
          }}
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Clear
        </button>
      </div>
    </form>
  )
}
