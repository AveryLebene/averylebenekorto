/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: (() => {
      const patterns = [];

      const blogUrl = process.env.NEXT_PUBLIC_BLOG_URL;
      if (blogUrl) {
        try {
          const { protocol, hostname } = new URL(blogUrl);
          patterns.push({
            protocol: protocol.replace(":", "") || "https",
            hostname,
            port: "",
            pathname: "/**",
            search: "",
          });
        } catch {
          // ignore invalid URL
        }
      }

      // Blog post images are served from Supabase Storage as signed URLs
      // (with a token query string), so `search` is intentionally left
      // unset here to allow any query string.
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (supabaseUrl) {
        try {
          const { protocol, hostname } = new URL(supabaseUrl);
          patterns.push({
            protocol: protocol.replace(":", "") || "https",
            hostname,
            port: "",
            pathname: "/storage/v1/object/**",
          });
        } catch {
          // ignore invalid URL
        }
      }

      return patterns;
    })(),
  },
};

module.exports = nextConfig
