export interface Bookmark {
  id: number
  type: string
  title: string
  content: string
  description: string | null
  categories: number[]
}

export interface CreateBookmarkData {
  type: string
  title: string
  content: string
  description: string | null
  categories: number[]
}