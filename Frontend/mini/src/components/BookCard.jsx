export default function BookCard({ book, onEdit, onDelete, deleting }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60 transition-shadow hover:shadow-md">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500 opacity-70" />
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-slate-900">
            {book.title}
          </h3>
          <p className="mt-1 text-sm text-slate-600">by {book.author}</p>
        </div>
        <div className="shrink-0 rounded-xl bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-200/60">
          ${Number(book.price ?? 0).toFixed(2)}
        </div>
      </div>

      <p className="mt-4 max-h-24 overflow-hidden text-sm leading-6 text-slate-600">
        {book.description}
      </p>

      <div className="mt-5 flex gap-2">
        <button
          type="button"
          onClick={() => onEdit(book)}
          className="inline-flex flex-1 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700 shadow-sm transition-colors hover:bg-indigo-100/60"
        >
          Edit
        </button>
        <button
          type="button"
          disabled={deleting}
          onClick={() => onDelete(book)}
          className="inline-flex flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-rose-600 to-orange-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {deleting ? 'Deleting…' : 'Delete'}
        </button>
      </div>
    </div>
  )
}
