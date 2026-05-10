/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "vuxz9tznczckbg5g.public.blob.vercel-storage.com"
            }
        ]
    },
};

export default nextConfig;
