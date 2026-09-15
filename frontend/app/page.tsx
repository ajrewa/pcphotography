import Link from "next/link";
import { ArrowRight, Camera, MapPin, Sparkles } from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";
import SectionHeading from "@/components/SectionHeading";
import { filmSections } from "@/lib/films";
import AroundIndia from "@/components/AroundIndia";
import NotesOfGratitude from "@/components/NotesOfGratitude";
import FilmReelDivider from "@/components/FilmReelDivider";
import { dummyWeddingFilms } from "@/lib/dummyWeddingFilms";
import FeatureFilms from "@/components/FeatureFilms";

export default function HomePage() {
  const allFilms = filmSections.flatMap((section) => section.films);

  return (
    <div className="pb-28 lg:pb-0">
      <section className="px-3 sm:px-6 pt-5">
        <HeroCarousel slides={allFilms} />
      </section>

      {/* Intro / stats */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-10 lg:grid-cols-[1fr_1fr] lg:items-end lg:px-16">
        <div>
          <p className="eyebrow text-xs font-medium uppercase text-stone">
            <span className="mr-2 inline-block h-px w-6 bg-ember align-middle" />
            Est. 2016 &middot; Films worldwide
          </p>
          <h2 className="font-display mt-4 text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            We film weddings like we&rsquo;re
            <span className="font-ital italic text-ember">
              {" "}
              not supposed to be there.
            </span>
          </h2>
        </div>
        <p className="max-w-md text-base leading-relaxed text-stone lg:justify-self-end">
          No forced poses, no shouted directions. We follow the day as it
          happens &mdash; the nervous pacing before the ceremony, the overheard
          toast, the last dance nobody wanted to end &mdash; and cut it into
          something you&rsquo;ll want to watch every anniversary.
        </p>
      </section>

      {/* Stat strip */}
      <section className="border-y border-black/10 bg-paper-dim/60">
        <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-black/10 px-5 py-10 text-center sm:px-10 lg:px-16">
          {[
            { n: "260+", l: "Weddings filmed" },
            { n: "31", l: "Countries" },
            { n: "9", l: "Years behind the lens" },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-display text-3xl text-ink sm:text-4xl">
                {s.n}
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-stone">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured films */}
      {/* <section className="mx-auto max-w-6xl px-5 py-20 sm:px-10 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Recent stories" title="Films we can&rsquo;t stop watching" />
          <Link
            href="/films"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-ink"
          >
            View all films
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

         <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((c, i) => (
          <span 
            key={c}
            className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide ${
              i === 0
                ? "border-ink bg-ink text-paper"
                : "border-black/15 text-stone"
            }`}
          >
            {c}
          </span>
        ))}
      </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {films.map((film) => (
            <FilmCard key={film.slug} film={film} />
          ))}
        </div>
      </section> */}

      {/* <div className="h-[100px] w-full">
  <TrainScene />
</div> */}

      <FeatureFilms />

      <FilmReelDivider />
      {/* all india  */}

      {/* <AroundIndia />
       */}

      <AroundIndia films={dummyWeddingFilms} />

      {/* Process */}
      <section className="bg-ink px-5 py-20 text-paper sm:px-10 lg:px-16">
        <SectionHeading
          eyebrow="How it works"
          title="Three days that become forever"
          dark
        />
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {[
            {
              icon: MapPin,
              title: "We come to you",
              body: "Anywhere the ceremony happens, we're already scouting light the day before.",
            },
            {
              icon: Camera,
              title: "We disappear into the day",
              body: "Two shooters, natural light, zero interruptions to your actual wedding.",
            },
            {
              icon: Sparkles,
              title: "You get the film in 6 weeks",
              body: "A highlight film first, then the full-length feature and raw cuts follow.",
            },
          ].map((step) => (
            <div key={step.title} className="border-t border-white/15 pt-6">
              <step.icon size={22} className="text-ember" />
              <h3 className="font-display mt-4 text-2xl text-paper">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-light">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}

      <NotesOfGratitude />

      {/* <section className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-10">
        <p className="font-ital text-2xl italic leading-relaxed text-ink sm:text-3xl">
          &ldquo;They filmed our wedding like it was the only one that mattered
          that day. We forgot the cameras were even there &mdash; until we
          saw the film and cried for twenty minutes straight.&rdquo;
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-full">
            <Image
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
              alt="Priya, bride"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm font-medium text-ink">Priya, married in Udaipur</p>
        </div>
      </section> */}

      {/* Workshop CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-10 lg:px-16">
        <div className="relative overflow-hidden rounded-[28px] bg-ember px-8 py-14 text-paper sm:px-16">
          <p className="eyebrow text-xs font-medium uppercase text-paper/80">
            PC Photography Workshop
          </p>
          <h2 className="font-display mt-3 max-w-xl text-4xl leading-tight sm:text-5xl">
            Want to shoot like this? We teach two workshops a year.
          </h2>
          <Link
            href="/workshop"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
          >
            See upcoming dates
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}

// export default function HomePage() {
//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <iframe
//         width="560"
//         height="315"
//         src="https://www.youtube.com/embed/E-jmyhn-rm4"
//         title="YouTube video player"
//         frameBorder={0}
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//         referrerPolicy="strict-origin-when-cross-origin"
//         allowFullScreen
//       />
//     </div>
//   );
// }
