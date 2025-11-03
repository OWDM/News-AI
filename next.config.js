/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: 'canvas' }];
    return config;
  },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    EXTRACTOR_API_KEY: process.env.EXTRACTOR_API_KEY,
  },
};

module.exports = nextConfig;
