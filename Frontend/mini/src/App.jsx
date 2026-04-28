import { Toaster } from 'react-hot-toast'
import Header from './components/Header.jsx'
import BooksPage from './pages/BooksPage.jsx'

export default function App() {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-slate-50 via-slate-50 to-indigo-50/40 text-slate-900">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <BooksPage />
      </main>
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
    </div>
  )
}
