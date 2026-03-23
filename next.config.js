/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: (() => {
      const blogUrl = process.env.NEXT_PUBLIC_BLOG_URL;
      if (!blogUrl) return [];
      try {
        const { protocol, hostname } = new URL(blogUrl);
        return [
          {
            protocol: protocol.replace(":", "") || "https",
            hostname,
            port: "",
            pathname: "/**",
            search: "",
          },
        ];
      } catch {
        return [];
      }
    })(),
  },
};

module.exports = nextConfig
