const path = require('path');

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: ''
            }
        ]
    },
    /** @type {import('next').NextConfig} */
      webpack: (config, { isServer }) => {
        config.resolve.alias['@dicebear/converter'] = path.resolve(__dirname, 'node_modules/@dicebear/converter/lib/index.js');
        
        return config;
      }
    
}