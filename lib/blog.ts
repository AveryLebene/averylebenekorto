/**
 * Blog data source: static feed.json from NEXT_PUBLIC_BLOG_URL (your deployed blog).
 * - Fetched at request time with revalidate: 60; no user input in the URL.
 * - No path traversal or SSRF: only ${base}/feed.json is requested.
 * Set NEXT_PUBLIC_BLOG_URL to your deployed blog (e.g. https://your-blog.vercel.app).
 * If unset or fetch fails, returns empty list.
 */

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  /** When set, used as the post URL and for scraping full content (e.g. external articles). */
  url?: string;
  excerpt?: string;
  image_url?: string;
  created_at: string;
  tags?: BlogTag[];
}

export interface BlogPostsResponse {
  posts: BlogPost[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

type SupabaseEnv = {
  url: string;
  anonKey: string;
  bucket: string;
};

function getBlogBaseUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_BLOG_URL;
  if (!url || typeof url !== "string") return null;
  return url.replace(/\/$/, "");
}

function getSupabaseEnv(): SupabaseEnv | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const bucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET || "blog-images";
  if (!url || !anonKey) return null;
  return { url, anonKey, bucket };
}

export function getBlogPostUrl(post: { slug: string; url?: string }): string {
  if (post.url) return post.url;
  const base = getBlogBaseUrl();
  if (base) return `${base}/posts/${post.slug}`;
  return "#";
}

function resolveRelativeImageUrls(
  base: string,
  posts: BlogPost[]
): BlogPost[] {
  const baseWithSlash = base.endsWith("/") ? base : `${base}/`;
  return posts.map((p) => {
    let image_url = p.image_url;
    if (image_url && !image_url.startsWith("http")) {
      image_url = `${baseWithSlash}${image_url.replace(/^\//, "")}`;
    }
    return { ...p, image_url };
  });
}

function parseSupabasePublicObjectUrl(
  url: string
): { bucket: string; objectPath: string } | null {
  // https://<ref>.supabase.co/storage/v1/object/public/<bucket>/<path>
  const marker = "/storage/v1/object/public/";
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  const rest = url.slice(idx + marker.length);
  const [bucket, ...pathParts] = rest.split("/");
  const objectPath = pathParts.join("/").split("?")[0] || "";
  if (!bucket || !objectPath) return null;
  return { bucket, objectPath };
}

async function signSupabaseImageUrl(originalUrl: string): Promise<string> {
  const env = getSupabaseEnv();
  if (!env) return originalUrl;

  const parsed = parseSupabasePublicObjectUrl(originalUrl);
  if (!parsed) return originalUrl;

  // Avoid bundling supabase-js into client bundles; this module is only used in server codepaths.
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(env.url, env.anonKey, {
    auth: { persistSession: false },
  });

  // If the URL points to a different bucket than configured, respect the URL.
  const bucket = parsed.bucket || env.bucket;
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(parsed.objectPath, 60 * 60); // 1 hour

  if (error || !data?.signedUrl) return originalUrl;
  return data.signedUrl;
}

export async function fetchBlogPosts(options: {
  limit?: number;
  page?: number;
  search?: string;
}): Promise<BlogPostsResponse> {
  const base = getBlogBaseUrl();
  const limit = options.limit ?? 6;
  const page = options.page ?? 1;
  const empty = (): BlogPostsResponse => ({
    posts: [],
    pagination: { total: 0, page: 1, limit, totalPages: 0 },
  });

  if (!base) return empty();

  try {
    // Prefer the blog's public API, which can return signed image URLs.
    // Fall back to feed.json if the API isn't available.
    let res = await fetch(
      `${base}/api/public-posts?limit=${encodeURIComponent(
        String(limit)
      )}&page=${encodeURIComponent(String(page))}${
        options.search?.trim()
          ? `&search=${encodeURIComponent(options.search.trim())}`
          : ""
      }`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) {
      res = await fetch(`${base}/feed.json`, { next: { revalidate: 60 } });
    }
    if (!res.ok) return empty();

    const data = (await res.json()) as BlogPostsResponse;
    let posts = data.posts ?? [];

    // Ensure any relative images resolve against the blog origin.
    posts = resolveRelativeImageUrls(base, posts);

    // If images are Supabase "public" URLs that don't actually work, sign them.
    posts = await Promise.all(
      posts.map(async (p) => {
        if (!p.image_url) return p;
        const image_url = await signSupabaseImageUrl(p.image_url);
        return { ...p, image_url };
      })
    );

    // If we're consuming feed.json, it may not include correct pagination.
    // Normalize pagination if missing.
    const pagination = data.pagination ?? {
      total: posts.length,
      page,
      limit,
      totalPages: Math.ceil(posts.length / limit) || 0,
    };

    return { posts, pagination };
  } catch {
    return empty();
  }
}

/** Fetches the full feed and returns a single post by slug, or null. */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const base = getBlogBaseUrl();
  if (!base || !slug?.trim()) return null;
  try {
    // Prefer the blog's public API so we receive signed image URLs if needed.
    let res = await fetch(`${base}/api/public-posts/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = (await res.json()) as { post?: BlogPost };
      if (!data?.post) return null;
      const [normalized] = resolveRelativeImageUrls(base, [data.post]);
      if (!normalized) return null;
      if (normalized.image_url) {
        const image_url = await signSupabaseImageUrl(normalized.image_url);
        return { ...normalized, image_url };
      }
      return normalized;
    }

    // Fallback to feed.json (older integration).
    res = await fetch(`${base}/feed.json`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = (await res.json()) as BlogPostsResponse;
    const posts = resolveRelativeImageUrls(base, data.posts ?? []);
    const post = posts.find((p) => p.slug === slug) ?? null;
    if (!post) return null;
    if (!post.image_url) return post;
    const image_url = await signSupabaseImageUrl(post.image_url);
    return { ...post, image_url };
  } catch {
    return null;
  }
}
