import Cookies from "js-cookie"
import { back_route } from "./config";
// import getConfig from 'next/config';

const headers = (token: string) => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};
// export const back_route = "http://172.17.0.1:3001/";
// const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
// export const back_route = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl;

export const request = async ({
  route,
  method,
  body,
  token
}: {
  route: string;
  method: "GET" | "POST" | "DELETE" | "UPDATE"
  body?: unknown;
  token?: string
}) => {
  console.log('back_route: ', back_route)
  console.log('route: ', route)
  console.log('body: ', body)
  console.log('token: ', token)
  const vyllyToken = JSON.parse(Cookies.get("vyllyToken") || '{}')
  console.log('vyllyToken: ', vyllyToken)
  return await fetch(`${route}`, {
    method,
    headers: token ? headers(token) : vyllyToken && vyllyToken.accessToken ? headers(vyllyToken.accessToken) : {'Content-Type': 'application/json'},
    body: body ? JSON.stringify(body) : null,
  }).then(response => response.json());
};