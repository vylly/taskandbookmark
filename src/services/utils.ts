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
  token,
}: {
  route: string;
  method: "GET" | "POST" | "DELETE" | "UPDATE"
  body: unknown;
  token?: string;
}) => {
  console.log('JSON.stringify(body): ', JSON.stringify(body))
  return await fetch(`${route}`, {
    method,
    headers: token ? headers(token) : {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  }).then(response => response.json());
};