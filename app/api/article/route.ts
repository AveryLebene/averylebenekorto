import { NextRequest, NextResponse } from "next/server";
import {
  fetchArticleContent,
  fetchArticleContentRich,
} from "@/lib/article";

/**
 * Fetches a URL and returns extracted article content.
 * Only allows same-origin or configured blog URLs.
 * ?rich=1 returns contentHtml with <pre><code> preserved for code blocks.
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  const requestOrigin = request.nextUrl.origin;
  const rich = request.nextUrl.searchParams.get("rich") === "1";

  try {
    if (rich) {
      const { contentHtml, title } = await fetchArticleContentRich(
        url,
        requestOrigin
      );
      return NextResponse.json({ contentHtml, title });
    }
    const { content, title } = await fetchArticleContent(url, requestOrigin);
    return NextResponse.json({ content, title });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to fetch article";
    if (message === "URL not allowed" || message.includes("Redirect")) {
      return NextResponse.json({ error: message }, { status: 403 });
    }
    console.error("Article fetch error:", e);
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 502 }
    );
  }
}
