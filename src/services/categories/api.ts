import { request } from "../utils"
const route = 'http://localhost:3001/' + 'categories'

export const createCategory = async (name: string, groupid: number, color: string, token?: string) => {
  const res = await request({route: `${route}/createCategory`, method: 'POST', body: {name, groupid, color}, token})
  console.log(res)
  return res
}

export const getAllCategoriesForGroup = async (groupid: number, token?: string) => {
  const res = await request({route: `${route}/getAllCategoriesForGroup`, method: 'POST', body: { groupid }, token})
  console.log(res)
  return res
}