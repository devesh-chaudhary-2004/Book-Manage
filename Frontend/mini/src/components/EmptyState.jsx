export default function EmptyState({ title, description }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200/60">
      <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-indigo-200/30 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-emerald-200/30 blur-2xl" />
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      {description ? (
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      ) : null}
    </div>
  )
}
