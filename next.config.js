/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'epnzbytknayfsuzgfjqz.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
    domains: ["epnzbytknayfsuzgfjqz.supabase.co"]
  }
};

export default config;
