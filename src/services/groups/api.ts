import { request, back_route } from "../utils"
const gp_route = back_route + 'groups'

export const getAllForUser = async (token?: string) => {
  const res = await request({route: `${gp_route}/getAll`, method: 'GET', token})
  return res
}

export const getGroup = async (id: number, token?: string) => {
  const res = await request({route: `${gp_route}/getGroup`, method: 'POST', body: {id: id}, token})
  return res
}

export const createGroup = async (name: string, token?: string) => {
  const res = await request({route: `${gp_route}/createGroup`, method: 'POST', body: {name}, token})
  return res
}

export const joinGroup = async (shareToken: string, token?: string) => {
  const res = await request({route: `${gp_route}/joinGroup`, method: 'POST', body: {shareToken}, token})
  return res
}