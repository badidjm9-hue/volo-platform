/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'uploadthing.com',
      'utfs.io',
      'images.unsplash.com',
      'lh3.googleusercontent.com',
      'api.liteapi.travel',
    ],
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/bookings',
        permanent: true,
      },
      {
        source: '/owner',
        destination: '/owner/overview',
        permanent: true,
      },
      {
        source: '/admin',
        destination: '/admin/overview',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig