import { request } from "../utils"
import { CreateBookmarkData } from "./types"
const route = 'http://localhost:3001/' + 'bookmarks'

export const createBookmark = async (bookmarkData: CreateBookmarkData, groupid: number, token?: string) => {
  const res = await request({route: `${route}/createBookmark`, method: 'POST', body: {...bookmarkData, groupid }, token})
  console.log(res)
  return res
}

export const getAllBookmarksForGroup = async (groupid: number, token?: string) => {
  const res = await request({route: `${route}/getAllBookmarksForGroup`, method: 'POST', body: { groupid }, token})
  console.log(res)
  return res
}