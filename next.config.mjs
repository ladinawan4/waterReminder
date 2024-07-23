/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    mdxRs: true,
  },
  serverComponentsExternalPackages: ['mongoose'],
  api: {
    bodyParser: {
      sizeLimit: '10mb',  
    },
  },
};

export default nextConfig;
