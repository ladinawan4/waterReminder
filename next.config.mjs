/** @type {import('next').NextConfig} */
const nextConfig = {
    serverActions: true,
    mdxRs:true,
    serverComponentsExternalPackages: ['mangoose']
};

export default nextConfig;
