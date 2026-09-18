import fs from "node:fs";
import path from "node:path";

export type Media = {
  image: string;
  videoUrl?: string;
  videoType?: "file" | "youtube" | "vimeo";
};

export type ContentFilm = Media & {
  slug: string;
  couple: string;
  location: string;
  date: string;
  teaser: string;
  category: string;
  thumbnail?: string;
};

export type IndiaFilm = {
  id: string;
  couple: string;
  slug: string;
  location: string;
  city: string;
  state: string;
  date: string;
  latitude: number;
  longitude: number;
  image: string;
  filmUrl: string;
};

export type GratitudeNote = {
  quote: string;
  author: string;
  role: string;
  image: string;
};

export type SiteContent = {
  hero: ContentFilm[];
  films: ContentFilm[];
  india: IndiaFilm[];
  gratitude: GratitudeNote[];
};

const contentPath = path.join(process.cwd(), "data", "content.json");

export function getSiteContent(): SiteContent {
  return JSON.parse(fs.readFileSync(contentPath, "utf8")) as SiteContent;
}

export function saveSiteContent(content: SiteContent) {
  fs.writeFileSync(contentPath, `${JSON.stringify(content, null, 2)}\n`, "utf8");
}
