import { useMemo, useState } from 'react'

const emptyErrors = { title: '', author: '', price: '', description: '' }
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState(emptyErrors)
export default function BookForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = 'Save',
  busy = false,
  resetAfterSubmit = false,
}) {
  const initial = useMemo(
    () => ({
      title: initialValues?.title ?? '',
      author: initialValues?.author ?? '',
      price:
        initialValues?.price === 0 || initialValues?.price
          ? String(initialValues.price)
          : '',
      description: initialValues?.description ?? '',
    }),
    [initialValues],
  )

 function validate() {
    const next = { ...emptyErrors }

    if (!values.title.trim()) next.title = 'Title is required.'
    if (!values.author.trim()) next.author = 'Author is required.'
    if (!values.description.trim()) next.description = 'Description is required.'

    const parsedPrice = Number(values.price)
    if (values.price === '') next.price = 'Price is required.'
    else if (Number.isNaN(parsedPrice)) next.price = 'Price must be a number.'
    else if (parsedPrice < 0) next.price = 'Price must be 0 or more.'

    setErrors(next)
    return Object.values(next).every((msg) => !msg)
  }

  function setField(name, value) {
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((e) => ({ ...e, [name]: '' }))
  }

 

  async function submit(e) {
    e.preventDefault()
    if (!validate()) return

    await onSubmit({
      title: values.title.trim(),
      author: values.author.trim(),
      price: Number(values.price),
      description: values.description.trim(),
    })

    if (resetAfterSubmit) {
      setValues(initial)
      setErrors(emptyErrors)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700">Title</label>
          <input
            value={values.title}
            onChange={(e) => setField('title', e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            placeholder="e.g. Clean Code"
          />
          {errors.title ? (
            <p className="mt-1 text-sm text-rose-600">{errors.title}</p>
          ) : null}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Author</label>
          <input
            value={values.author}
            onChange={(e) => setField('author', e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            placeholder="e.g. Robert C. Martin"
          />
          {errors.author ? (
            <p className="mt-1 text-sm text-rose-600">{errors.author}</p>
          ) : null}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Price</label>
          <input
            value={values.price}
            onChange={(e) => setField('price', e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            type="number"
            step="0.01"
            min="0"
            placeholder="e.g. 29.99"
          />
          {errors.price ? (
            <p className="mt-1 text-sm text-rose-600">{errors.price}</p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            value={values.description}
            onChange={(e) => setField('description', e.target.value)}
            className="mt-1 min-h-24 w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            placeholder="Short summary about the book..."
          />
          {errors.description ? (
            <p className="mt-1 text-sm text-rose-600">{errors.description}</p>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
        ) : null}

        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  )
}
