'use server'

import { back_route } from "../config"
import { request } from "../utils"
import { LoginData, NewUser } from "./types"
import { cookies } from 'next/headers'; // Server-side cookie API

// const route = process.env.BACKEND_URL + 'auth'
const auth_route = back_route + 'auth'

export const signup = async (newUser: NewUser) => {
  const res = await request({route: `${auth_route}/signup/`, method: 'POST', body: newUser})
  if(res['access_token']){
    const cookieStore = await cookies();
    cookieStore.set("vyllyToken", JSON.stringify({
      accessToken: res['access_token'],
      expiredAt: res['expiredAt']
    }))
  }
  return res
}

export const login = async (user: LoginData) => {
  const res = await request({route: `${auth_route}/login/`, method: 'POST', body: user})
  console.log('res: ', res)
  if(res['access_token']){
    const cookieStore = await cookies();
    cookieStore.set("vyllyToken", JSON.stringify({
      accessToken: res['access_token'],
      expiredAt: res['expiredAt']
    }))
  }
  
  return res
}

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("vyllyToken")
  const res = await request({route: `${auth_route}/logout/`, method: 'POST', body: {}})
  return res
}