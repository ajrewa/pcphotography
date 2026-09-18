import { NextResponse } from "next/server";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(getSiteContent());
}
