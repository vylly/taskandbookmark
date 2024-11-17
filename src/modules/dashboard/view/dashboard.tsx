"use client"
import { useEffect, useState } from "react"
import { CategoryFilterMenu } from "../atoms/category-filter-menu"
import { CategorySettingsDialog } from "../atoms/category-settings"
import { AddCategoryOrBookmarkMenu } from "../molecules/add-category-or-bookmark"
import { createCategory, deleteCategory, getAllCategoriesForGroup, updateCategory } from "@/services/categories/api"
import { Bookmark, CreateBookmarkData } from "@/services/bookmarks/types"
import { createBookmark, deleteBookmarkForGroup, getAllBookmarksForGroup, updateBookmark } from "@/services/bookmarks/api"
import { Category } from "@/services/categories/types"
import toast from "react-hot-toast"
import { BookmarkCard } from "../atoms/bookmark-card"
import { Input } from "@/components/ui/input"
import { ui } from "@/store"

export const DashboardView = (props: {groupid: number}) => {
  const { groupid } = props
  const [bookmarksData, setBookmarkData] = useState<Bookmark[]>([])
  const [categoriesData, setCategoriesData] = useState<Category[]>([])
  const [filteredCategories, setFilteredCategories] = useState<{[key: number]: boolean}>({} as {[key: number]: boolean})
  const [searchValue, setSearchValue] = useState('')
  const [filteredBMs, setFilteredBMs] = useState<Bookmark[]>(bookmarksData)
  const showLinks = ui.$showLinks.hook()
  const showNotes = ui.$showNotes.hook()

  useEffect(() => {
    async function fetchData() {
      const bmData = await getAllBookmarksForGroup(groupid)
      const categoriesData = await getAllCategoriesForGroup(groupid)
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

  useEffect(() => {
    const bmData = [...bookmarksData]

    const filtered = bmData.filter((bm) => {
      return (bm.type === 'link' && showLinks) || (bm.type === 'note' && showNotes)
    })

    if(!searchValue) {
      setFilteredBMs(filtered)
      return
    }
    const filteredSearch = filtered.filter((bm) => {
      return bm.title.includes(searchValue)
    })
    if(!filteredSearch) { 
      setFilteredBMs([])
      return
    }
    setFilteredBMs(filteredSearch)
  }, [searchValue, bookmarksData, showLinks, showNotes])

  const handleAddNewCategory = async (name: string, color: string) => {
    setFilteredCategories({...filteredCategories, [name]: true})
    const res = await createCategory(name, groupid, color)
    if(res.code || res.statusCode) {
      toast.error(res.message)
      return
    }
    const newCatData = [...categoriesData]
    newCatData.push(res)
    setCategoriesData(newCatData)
  }

  const handleAddNewBookmark = async (newBookmark: CreateBookmarkData) => {
    const res = await createBookmark(newBookmark, groupid)
    if(res.code || res.statusCode) {
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
    if(res.code || res.statusCode) {
      toast.error(res.message)
      return
    }
    const newBookmarkData = [...bookmarksData]
    const removed = newBookmarkData.filter((el => {return el.id !== bookmarkid}))
    setBookmarkData(removed)
  }

  const handleUpdateBookmark = async (updatedBm: Bookmark) => {
    const res = await updateBookmark(groupid, updatedBm)
    if(res.code || res.statusCode) {
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

  const handleUpdateCategory = async (updatedCat: Category) => {
    const res = await updateCategory(groupid, updatedCat)
    if(res.code || res.statusCode) {
      toast.error(res.message)
      return
    }
    const newCategoriesData = [...categoriesData]
    const catToUpdate = newCategoriesData.find(cat => cat.id === updatedCat.id)
    if(!catToUpdate) {
      newCategoriesData.push(updatedCat)
      setCategoriesData(newCategoriesData)
      return
    }
    Object.assign(catToUpdate, updatedCat)
    setCategoriesData(newCategoriesData)
  }

  const handleDeleteCategory = async (catid: number) => {
    const res = await deleteCategory(groupid, catid)
    if(res.code || res.statusCode) {
      toast.error(res.message)
      return
    }
    const newCatData = [...categoriesData]
    const removed = newCatData.filter((el => {return el.id !== catid}))
    setCategoriesData(removed)
  }

  return (
    <div className="Dashboard w-full p-8 flex flex-col items-start gap-4">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-1 items-center justify-start gap-2">
          Bookmarks
        </div>
        <Input className="w-96 flex-1" placeholder="search" value={searchValue} onChange={(ev) => setSearchValue(ev.target.value)}/>
        <div className="flex flex-1 items-center justify-end gap-2">
          <AddCategoryOrBookmarkMenu categories={categoriesData} onAddBookmark={handleAddNewBookmark} onAddCategory={handleAddNewCategory}/>
          {categoriesData.length ? 
          <>
            <CategoryFilterMenu categories={categoriesData} filteredCategories={filteredCategories} onSelectNewFilter={handleFilterCategorySwitch}/>
            <CategorySettingsDialog categories={categoriesData} handleDeleteCategory={handleDeleteCategory} handleUpdateCategory={handleUpdateCategory}/>
          </>
             
          : null}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 w-full">
        {filteredBMs && filteredBMs.map((bookmark) => {
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