"use client"
import { useEffect, useState } from "react"
import { CategoryFilterMenu } from "../atoms/category-filter-menu"
import { AddCategoryOrBookmarkMenu } from "../molecules/add-category-or-bookmark"
import { createCategory, getAllCategoriesForGroup } from "@/services/categories/api"
import { Bookmark, CreateBookmarkData } from "@/services/bookmarks/types"
import { createBookmark, deleteBookmarkForGroup, getAllBookmarksForGroup, updateBookmark } from "@/services/bookmarks/api"
import { Category } from "@/services/categories/types"
import toast from "react-hot-toast"
import { BookmarkCard } from "../atoms/bookmark-card"

export const DashboardView = (props: {groupid: number}) => {
  const { groupid } = props
  const [bookmarksData, setBookmarkData] = useState<Bookmark[]>([])
  const [categoriesData, setCategoriesData] = useState<Category[]>([])
  const [filteredCategories, setFilteredCategories] = useState<{[key: number]: boolean}>({} as {[key: number]: boolean})

  useEffect(() => {
    async function fetchData() {
      const bmData = await getAllBookmarksForGroup(groupid)
      console.log('bmData: ', bmData)
      const categoriesData = await getAllCategoriesForGroup(groupid)
      console.log('categoriesData: ', categoriesData)
      setBookmarkData(bmData)
      setCategoriesData(categoriesData)
    }
    fetchData();
  }, [groupid])

  useEffect(() => {
    const newFilter: {[key: number]: boolean} = {...filteredCategories}
    categoriesData.forEach((cat) => {
      if(!filteredCategories.hasOwnProperty(cat.id)) {
        newFilter[cat.id] = true
      }
    })
    setFilteredCategories(newFilter)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesData])

  const handleAddNewCategory = async (name: string, color: string) => {
    setFilteredCategories({...filteredCategories, [name]: true})
    const res = await createCategory(name, groupid, color)
    if(res.code) {
      toast.error(res.message)
      return
    }
    const newCatData = [...categoriesData]
    newCatData.push(res)
    setCategoriesData(newCatData)
  }

  const handleAddNewBookmark = async (newBookmark: CreateBookmarkData) => {
    const res = await createBookmark(newBookmark, groupid)
    if(res.code) {
      toast.error(res.message)
      return
    }
    const newBMData = [...bookmarksData]
    newBMData.push(res)
    setBookmarkData(newBMData)
  }

  const handleFilterCategorySwitch = (categoryId: number) => {
    const newFilteredCat = {...filteredCategories}
    newFilteredCat[categoryId] = !newFilteredCat[categoryId]
    setFilteredCategories(newFilteredCat)
  }

  const handleDeleteBookmark = async (bookmarkid: number) => {
    const res = await deleteBookmarkForGroup(groupid, bookmarkid)
    if(res.code) {
      toast.error(res.message)
      return
    }
    const newBookmarkData = [...bookmarksData]
    const removed = newBookmarkData.filter((el => {return el.id !== bookmarkid}))
    setBookmarkData(removed)
  }

  const handleUpdateBookmark = async (updatedBm: Bookmark) => {
    const res = await updateBookmark(groupid, updatedBm)
    if(res.code) {
      toast.error(res.message)
      return
    }
    const newBookmarkData = [...bookmarksData]
    const bmToUpdate = newBookmarkData.find(bm => bm.id === updatedBm.id)
    if(!bmToUpdate) {
      newBookmarkData.push(updatedBm)
      setBookmarkData(newBookmarkData)
      return
    }
    Object.assign(bmToUpdate, updatedBm)
    setBookmarkData(newBookmarkData)
  }

  return (
    <div className="Dashboard w-full p-8 flex flex-col items-start gap-4">
      <div className="w-full flex items-center justify-between">
        <span>Bookmarks</span>
        <div className="flex items-center justify-center gap-2">
          <AddCategoryOrBookmarkMenu categories={categoriesData} onAddBookmark={handleAddNewBookmark} onAddCategory={handleAddNewCategory}/>
          {categoriesData.length ? <CategoryFilterMenu categories={categoriesData} filteredCategories={filteredCategories} onSelectNewFilter={handleFilterCategorySwitch}/> : null}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 w-full">
        {bookmarksData && bookmarksData.map((bookmark) => {
          const shouldDisplay = bookmark.categories.find((cat) => {
            return filteredCategories[cat]
          })
          if(!shouldDisplay) return
          return (
            <BookmarkCard key={bookmark.id} bookmark={bookmark} categories={categoriesData} handleDeleteBookmark={handleDeleteBookmark} handleUpdateBookmark={handleUpdateBookmark}/>
          )
        })}
      </div>
    </div>
    
  )
}