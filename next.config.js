/** @type {import('next').NextConfig} */
const nextConfig = {
  serverActions: {
    // Do not allow requests from opaque (null) origins (e.g. sandboxed iframes)
    // to invoke Server Actions. An empty allowedOrigins list means only same-origin
    // requests are permitted, which is the secure default.
    // See: Next.js null-origin CSRF bypass (fixed in next >= 16.1.7).
    allowedOrigins: []
  }
}

module.exports = nextConfig
