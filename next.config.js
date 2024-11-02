const { hostname } = require('os')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'is1-ssl.mzstatic.com',
                pathname: '/**'
            }
        ]
    }
}

module.exports = nextConfig
