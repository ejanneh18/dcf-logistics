/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: Object.keys(process.env)
    .filter(key => key.startsWith('NEXT_PUBLIC_'))
    .reduce((obj, key) => {
      obj[key] = process.env[key];
      return obj;
    }, {}),
}

nextConfig.output = 'export';

export default nextConfig
