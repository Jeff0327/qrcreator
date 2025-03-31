/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable image optimization
    images: {
        formats: ['image/avif', 'image/webp'],
        domains: ['yourwebsite.com'],
    },

    // Progressive Web App configuration
    experimental: {
        optimizeCss: false, // CSS optimization
    },

    // Content Security Policy
    headers: async () => {
        return [
            {
                source: "/(.*)",
                headers: [
                    // Content Security Policy
                    {
                        key: "Content-Security-Policy",
                        value:
                            "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com; img-src 'self' data: https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; connect-src 'self' https://www.google-analytics.com; frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com;",
                    },
                    // XSS Protection
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block",
                    },
                    // Prevent MIME sniffing
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    // Referrer policy
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    // Permissions policy
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
                    },
                ],
            },
        ];
    },

    // Use gzip compression
    compress: true,

    // Increase build performance
    swcMinify: true,

    // Add redirects
    async redirects() {
        return [
            {
                source: '/qr-generator',
                destination: '/',
                permanent: true,
            },
            {
                source: '/qr-code-generator',
                destination: '/',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;