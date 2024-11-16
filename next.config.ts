import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000, // Check for file changes every second
        aggregateTimeout: 300, // Delay before rebuilding
      };
    }
    return config;
  },
  serverRuntimeConfig: {
    // use this when using docker
    // URI: 'http://backend:3001/'
    URI: 'http://localhost:3001/'
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    URI: 'http://localhost:3001/'
  }
};

// module.exports = {
//   serverRuntimeConfig: {
//     // Will only be available on the server side
//     URI: 'http://backend:3001/'
//   },
//   publicRuntimeConfig: {
//     // Will be available on both server and client
//     URI: 'http://localhost:3001/'
//   }
// }

export default nextConfig;
