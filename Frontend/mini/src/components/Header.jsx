export default function Header() {
  return (
    <header className="border-b border-slate-200/60 bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
              Book Management System
            </h1>
          </div>
          <div className="hidden sm:block">
            <div className="h-10 w-40 rounded-2xl bg-gradient-to-r from-indigo-500/15 via-violet-500/15 to-emerald-500/15 ring-1 ring-slate-200/60" />
          </div>
        </div>
      </div>
    </header>
  )
}
