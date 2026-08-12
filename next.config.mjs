/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static output — deployable to Firebase Hosting (pranavj.web.app) or any CDN.
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
