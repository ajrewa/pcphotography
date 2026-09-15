"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import FilmCard from "./FilmCard";
import { filmSections } from "@/lib/films";

export default function FeatureFilms() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Dynamic tab menu
  const categories = [
    {
      slug: "all",
      label: "All",
    },
    ...filmSections.map((section) => ({
      slug: section.slug,
      label: section.label,
    })),
  ];

  // Dynamic film filtering
  const filteredFilms = useMemo(() => {
    // All
    if (activeCategory === "all") {
      return filmSections.flatMap((section) => section.films);
    }

    // Selected category
    return (
      filmSections.find(
        (section) => section.slug === activeCategory
      )?.films ?? []
    );
  }, [activeCategory]);

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-10 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Recent stories"
          title="Films we can&rsquo;t stop watching"
        />

        <Link
          href="/films"
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-ink"
        >
          View all films

          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Dynamic tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = activeCategory === category.slug;

          return (
            <button
              key={category.slug}
              type="button"
              onClick={() => setActiveCategory(category.slug)}
              className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${
                isActive
                  ? "border-ink bg-ink text-paper"
                  : "border-black/15 text-stone hover:border-ink hover:text-ink"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Dynamic films */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredFilms.map((film) => (
          <FilmCard key={film.slug} film={film} />
        ))}
      </div>
    </section>
  );
}
