"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { ContentFilm, SiteContent } from "@/lib/content";

export default function FilmWatchPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const [film, setFilm] = useState<ContentFilm | null>(null);

  useEffect(() => {
    fetch("/api/content")
      .then((response) => response.json() as Promise<SiteContent>)
      .then((content) => setFilm(content.films.find((item) => item.slug === slug) || null));
  }, [slug]);

  if (!film) {
    return <main className="flex min-h-screen items-center justify-center text-sm text-stone">Loading film...</main>;
  }

  return (
    <main className="min-h-screen bg-ink px-5 pb-20 pt-8 text-paper sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <Link href="/films" className="text-xs uppercase tracking-[0.2em] text-paper/60 hover:text-paper">Back to films</Link>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="relative aspect-video overflow-hidden rounded-3xl bg-black">
            {film.videoUrl && film.videoType === "file" ? (
              <video controls autoPlay playsInline poster={film.image} className="h-full w-full object-cover">
                <source src={film.videoUrl} />
              </video>
            ) : film.videoUrl ? (
              <iframe src={film.videoUrl} title={`${film.couple} wedding film`} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="h-full w-full" />
            ) : (
              <Image src={film.image} alt={film.couple} fill className="object-cover" />
            )}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-paper/50">{film.category} / {film.date}</p>
            <h1 className="font-display mt-4 text-5xl leading-none sm:text-6xl">{film.couple}</h1>
            <p className="mt-5 text-sm leading-relaxed text-paper/70">{film.teaser}</p>
            <p className="mt-6 text-xs uppercase tracking-[0.15em] text-paper/50">{film.location}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
