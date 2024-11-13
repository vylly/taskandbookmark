import { request } from "../utils"
import { LoginData, NewUser } from "./types"
import Cookies from "js-cookie"

// const route = process.env.BACKEND_URL + 'auth'
const route = 'http://localhost:3001/' + 'auth'

export const signup = async (newUser: NewUser) => {
  const res = await request({route: `${route}/signup`, method: 'POST', body: newUser})
  console.log('res: ', res)
  if(res['access_token']){
    Cookies.set("vyllyToken", JSON.stringify({
      accessToken: res['access_token'],
      expiredAt: res['expiredAt']
    }))
  }
  return res
}

export const login = async (user: LoginData) => {
  const res = await request({route: `${route}/login`, method: 'POST', body: user})
  console.log('res: ', res)
  if(res['access_token']){
    Cookies.set("vyllyToken", JSON.stringify({
      accessToken: res['access_token'],
      expiredAt: res['expiredAt']
    }))
  }
  return res
}

export const logout = async () => {
  const res = await request({route: `${route}/logout`, method: 'POST', body: {}})
  console.log('res: ', res)
  Cookies.remove("vyllyToken")
  return res
}