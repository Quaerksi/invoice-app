/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // make Next.js 13 app directory work
  experimental:{appDir: true}
}

module.exports = nextConfig
