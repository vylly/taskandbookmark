import Cookies from "js-cookie"
// import getConfig from 'next/config';

const headers = (token: string) => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

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
  const vyllyToken = JSON.parse(Cookies.get("vyllyToken") || '{}')
  return await fetch(`${route}`, {
    method,
    headers: token ? headers(token) : vyllyToken && vyllyToken.accessToken ? headers(vyllyToken.accessToken) : {'Content-Type': 'application/json'},
    body: body ? JSON.stringify(body) : null,
  }).then(response => response.json());
};