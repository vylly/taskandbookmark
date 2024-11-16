import { back_route } from "../config"
import { request } from "../utils"
import { Bookmark, CreateBookmarkData } from "./types"


const bm_route = back_route + 'bookmarks'

export const createBookmark = async (bookmarkData: CreateBookmarkData, groupid: number, token?: string) => {
  const res = await request({route: `${bm_route}/createBookmark`, method: 'POST', body: {...bookmarkData, groupid }, token})
  console.log(res)
  return res
}

export const getAllBookmarksForGroup = async (groupid: number, token?: string) => {
  const res = await request({route: `${bm_route}/getAllBookmarksForGroup`, method: 'POST', body: { groupid }, token})
  console.log(res)
  return res
}

export const deleteBookmarkForGroup = async (groupid: number, bookmarkid: number, token?: string) => {
  const res = await request({route: `${bm_route}/deleteBookmarkForGroup`, method: 'POST', body: { groupid, bookmarkid }, token})
  console.log(res)
  return res
}

export const updateBookmark = async (groupid: number, updateBm: Bookmark, token?: string) => {
  const res = await request({route: `${bm_route}/updateBookmark`, method: 'POST', body: { groupid, ...updateBm }, token})
  console.log(res)
  return res
}