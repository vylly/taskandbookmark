"use client"
import { useEffect, useState } from "react"
import { CategoryFilterMenu } from "../molecules/category-filter-menu"
import { AddCategoryOrBookmarkMenu } from "../molecules/add-category-or-bookmark"

export interface BookmarkData {
  id: string
  type: string
  category: string
  private: boolean
  title: string
  content: string
}

export const DashboardView = () => {
  const [bookmarksData, setBookmarkData] = useState([
    {
      id: '123',
      type: 'bookmark',
      category: 'dofus',
      private: true,
      title: 'dofus website',
      content: 'https://dofus.com'
    }, 
    {
      id: '1234',
      type: 'bookmark',
      category: 'wakfu',
      private: true,
      title: 'wakfu website',
      content: 'https://dofus.com'
    },
    {
      id: '12345',
      type: 'bookmark',
      category: 'all',
      private: true,
      title: 'google',
      content: 'https://google.com'
    },  
  ])
  const [filterBookmarkData, setFilterBookmarkData] = useState<BookmarkData[] | null>(bookmarksData)
  const [filteredCategories, setFilteredCategories] = useState<{[categoryName: string]: boolean}>(
    {
      'all': true,
      'dofus': true,
      'wakfu': true
    }
  )

  useEffect(() => {
    const newBookmarksData = bookmarksData.filter((bookmark) => {
      return filteredCategories[bookmark.category]
    }) || null
    setFilterBookmarkData(newBookmarksData)
  }, [bookmarksData, filteredCategories])

  useEffect(() => {
    console.log(document.cookie)
  }, [])

  return (
    <div className="Dashboard w-full p-8 flex flex-col items-start gap-4">
      <div className="w-full flex items-center justify-between">
        <span>Bookmarks</span>
        <div className="flex items-center justify-center gap-2">
          <AddCategoryOrBookmarkMenu categories={filteredCategories} onAddBookmark={(newBookmark: BookmarkData) => {setBookmarkData([...bookmarksData, newBookmark])}} onAddCategory={(newValue: string) => {setFilteredCategories({...filteredCategories, [newValue]: true})}}/>
          <CategoryFilterMenu categories={filteredCategories} onSelectNewFilter={(newCategories: {[categoryName: string]: boolean}) => setFilteredCategories(newCategories)}/>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 w-full">
        {filterBookmarkData && filterBookmarkData.map((bookmark) => {
          return (
            <a key={bookmark.id} className="bg-secondary w-full p-2 gap-2 flex items-center justify-between rounded-md" href={bookmark.content} target="_blank">
              <span>{bookmark.category || 'global'}</span>
              <span>{bookmark.title}</span>
            </a>
          )
        })}
      </div>
    </div>
    
  )
}