/**
 * Shared article fetch and extraction for /api/article and blog detail page.
 * Only allows configured blog URL, joeatteen.com, and request origin.
 */

const FETCH_OPTIONS = {
  headers: { "User-Agent": "Mozilla/5.0 (compatible; portfolio-fetcher/1.0)" },
  redirect: "manual" as RequestRedirect,
  next: { revalidate: 3600 },
};

export function getArticleAllowedOrigins(requestOrigin: string): string[] {
  const base = process.env.NEXT_PUBLIC_BLOG_URL?.replace(/\/$/, "");
  const origins = [
    base ? new URL(base).origin : null,
    "https://averylebenekorto.vercel.app",
    requestOrigin,
  ].filter(Boolean) as string[];
  return Array.from(new Set(origins));
}

export function extractTitle(html: string): string {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return match ? match[1].trim().replace(/\s+/g, " ") : "";
}

function getMainRaw(html: string): string {
  const mainMatch =
    html.match(/<main[^>]*>([\s\S]*?)<\/main>/i) ||
    html.match(/<article[^>]*>([\s\S]*?)<\/article>/i) ||
    html.match(/<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
    html.match(/<div[^>]*class="[^"]*post[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  return mainMatch
    ? mainMatch[1]
    : html.replace(/[\s\S]*<body[^>]*>/i, "").replace(/<\/body>[\s\S]*/, "");
}

function stripDangerous(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "");
}

function escapeForCode(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Plain text extraction; no HTML. */
export function extractArticleContent(html: string): string {
  const raw = stripDangerous(getMainRaw(html));
  const stripTags = (s: string) =>
    s
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/\s+/g, " ")
      .trim();
  return stripTags(raw).slice(0, 15000);
}

const CODE_PLACEHOLDER_PREFIX = "__PORTFOLIO_CODE_";
const CODE_PLACEHOLDER_SUFFIX = "__";

function getPreLanguage(preTag: string): string {
  const langMatch = preTag.match(/\blanguage-(\w+)/i);
  return langMatch ? langMatch[1].toLowerCase() : "";
}

/** Extracts article body and preserves <pre><code> blocks for syntax highlighting. Returns safe HTML. */
export function extractArticleContentRich(html: string): string {
  let raw = stripDangerous(getMainRaw(html));
  const codeBlocks: { code: string; language: string }[] = [];
  raw = raw.replace(/<pre([^>]*)>([\s\S]*?)<\/pre>/gi, (_, preAttrs, inner) => {
    const index = codeBlocks.length;
    const language = getPreLanguage(preAttrs);
    const code = escapeForCode(inner.replace(/<[^>]+>/g, " ").trim());
    codeBlocks.push({ code, language });
    return `${CODE_PLACEHOLDER_PREFIX}${index}${CODE_PLACEHOLDER_SUFFIX}`;
  });
  const stripTags = (s: string) =>
    s
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/\s+/g, " ")
      .trim();
  let out = stripTags(raw).slice(0, 50000);
  codeBlocks.forEach((block, i) => {
    const placeholder = `${CODE_PLACEHOLDER_PREFIX}${i}${CODE_PLACEHOLDER_SUFFIX}`;
    const langAttr = block.language
      ? ` data-language="${block.language.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}"`
      : "";
    const codeHtml = `<pre class="portfolio-code"${langAttr}><code>${block.code}</code></pre>`;
    out = out.replace(placeholder, codeHtml);
  });
  return out;
}

async function fetchOne(
  url: URL,
  allowedOrigins: string[]
): Promise<{ html: string }> {
  const res = await fetch(url.href, FETCH_OPTIONS);
  if (res.status >= 300 && res.status < 400) {
    const location = res.headers.get("location");
    if (location) {
      const redirectUrl = new URL(location, url.origin);
      if (!allowedOrigins.includes(redirectUrl.origin)) {
        throw new Error("Redirect to disallowed origin");
      }
      const redirectRes = await fetch(redirectUrl.href, FETCH_OPTIONS);
      if (redirectRes.status >= 300 && redirectRes.status < 400) {
        throw new Error("Too many redirects");
      }
      if (!redirectRes.ok) {
        throw new Error(`Fetch failed: ${redirectRes.status}`);
      }
      const html = await redirectRes.text();
      return { html };
    }
  }
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const html = await res.text();
  return { html };
}

export async function fetchArticleContent(
  url: string,
  requestOrigin: string
): Promise<{ content: string; title: string }> {
  const parsed = new URL(url);
  const allowedOrigins = getArticleAllowedOrigins(requestOrigin);
  if (!allowedOrigins.includes(parsed.origin)) {
    throw new Error("URL not allowed");
  }
  const { html } = await fetchOne(parsed, allowedOrigins);
  return {
    content: extractArticleContent(html),
    title: extractTitle(html),
  };
}

export async function fetchArticleContentRich(
  url: string,
  requestOrigin: string
): Promise<{ contentHtml: string; title: string }> {
  const parsed = new URL(url);
  const allowedOrigins = getArticleAllowedOrigins(requestOrigin);
  if (!allowedOrigins.includes(parsed.origin)) {
    throw new Error("URL not allowed");
  }
  const { html } = await fetchOne(parsed, allowedOrigins);
  return {
    contentHtml: extractArticleContentRich(html),
    title: extractTitle(html),
  };
}
