import { NextResponse } from "next/server";
import { getSiteContent, saveSiteContent, type SiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

function authorized(request: Request) {
  const token = process.env.ADMIN_TOKEN;
  return Boolean(token) && request.headers.get("x-admin-token") === token;
}

export function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getSiteContent());
}

export async function PUT(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const content = (await request.json()) as SiteContent;
    if (!Array.isArray(content.hero) || !Array.isArray(content.films) || !Array.isArray(content.india) || !Array.isArray(content.gratitude)) {
      return NextResponse.json({ error: "Invalid content shape" }, { status: 400 });
    }
    saveSiteContent(content);
    return NextResponse.json(content);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
