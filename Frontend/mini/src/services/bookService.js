import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/books',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function getAllBooks() {
  const { data } = await api.get('')
  return data
}

export async function createBook(book) {
  const { data } = await api.post('', book)
  return data
}

export async function updateBook(id, book) {
  const { data } = await api.put(`/${id}`, book)
  return data
}

export async function deleteBook(id) {
  const { data } = await api.delete(`/${id}`)
  return data
}

export async function searchByTitle(title) {
  const { data } = await api.get('/search/title', {
    params: { title },
  })
  return data
}

export async function searchByAuthor(author) {
  const { data } = await api.get('/search/author', {
    params: { author },
  })
  return data
}

export function toHumanError(err) {
  if (!err) return 'Unknown error'
  const message =
    err?.response?.data?.message ||
    err?.response?.data ||
    err?.message ||
    'Request failed'

  return typeof message === 'string' ? message : 'Request failed'
}
