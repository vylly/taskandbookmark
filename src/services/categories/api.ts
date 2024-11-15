import { request, back_route } from "../utils"
const cat_route = back_route + 'categories'

export const createCategory = async (name: string, groupid: number, color: string, token?: string) => {
  const res = await request({route: `${cat_route}/createCategory`, method: 'POST', body: {name, groupid, color}, token})
  console.log(res)
  return res
}

export const getAllCategoriesForGroup = async (groupid: number, token?: string) => {
  const res = await request({route: `${cat_route}/getAllCategoriesForGroup`, method: 'POST', body: { groupid }, token})
  console.log(res)
  return res
}