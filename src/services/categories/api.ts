import { back_route } from "../config"
import { request } from "../utils"
import { Category } from "./types"
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

export const updateCategory = async (groupid: number, updateCat: Category, token?: string) => {
  const res = await request({route: `${cat_route}/updateCategory`, method: 'POST', body: { groupid, ...updateCat }, token})
  console.log(res)
  return res
}

export const deleteCategory = async (groupid: number, catid: number, token?: string) => {
  const res = await request({route: `${cat_route}/deleteCategory`, method: 'POST', body: { groupid, id: catid }, token})
  console.log(res)
  return res
}