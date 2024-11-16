import getConfig from 'next/config';

const config = getConfig();

let back_route = process.env.NEXT_PUBLIC_API_URL;
if (config) {
  console.log('config: ',config)
  back_route = config?.serverRuntimeConfig?.URI
}

export {
  back_route
}