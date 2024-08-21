/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://web-checkers-api.test/api/:path*",
            }
        ]
    },
};

export default nextConfig;
