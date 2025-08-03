/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // 确保静态资源正确处理
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
};

export default nextConfig;
