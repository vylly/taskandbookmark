import { request } from "../utils"
const route = 'http://localhost:3001/' + 'groups'

export const getAllForUser = async (token?: string) => {
  const res = await request({route: `${route}/getAll`, method: 'GET', token})
  return res
}

export const getGroup = async (id: number, token?: string) => {
  const res = await request({route: `${route}/getGroup`, method: 'POST', body: {id: id}, token})
  return res
}

export const createGroup = async (name: string, token?: string) => {
  const res = await request({route: `${route}/createGroup`, method: 'POST', body: {name}, token})
  return res
}

export const joinGroup = async (shareToken: string, token?: string) => {
  const res = await request({route: `${route}/joinGroup`, method: 'POST', body: {shareToken}, token})
  return res
}