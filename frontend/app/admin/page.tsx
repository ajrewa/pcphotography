"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/content";

const sections: Array<keyof SiteContent> = ["hero", "films", "india", "gratitude"];

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [active, setActive] = useState<keyof SiteContent>("hero");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [draft, setDraft] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedToken = window.localStorage.getItem("admin-token") || "";
    setToken(storedToken);
    if (storedToken) loadContent(storedToken);
  }, []);

  async function loadContent(currentToken = token) {
    const response = await fetch("/api/admin/content", {
      headers: { "x-admin-token": currentToken },
    });
    if (!response.ok) {
      setMessage("Access denied. Check ADMIN_TOKEN.");
      return;
    }
    const nextContent = (await response.json()) as SiteContent;
    setContent(nextContent);
    setDraft(JSON.stringify(nextContent[active], null, 2));
    setMessage("Loaded");
  }

  function selectSection(section: keyof SiteContent) {
    if (!content) return;
    setActive(section);
    setDraft(JSON.stringify(content[section], null, 2));
  }

  async function save() {
    if (!content) return;
    try {
      const updated = { ...content, [active]: JSON.parse(draft) };
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify(updated),
      });
      if (!response.ok) throw new Error();
      const saved = (await response.json()) as SiteContent;
      setContent(saved);
      setDraft(JSON.stringify(saved[active], null, 2));
      setMessage("Saved");
    } catch {
      setMessage("Save failed. Check that the section is valid JSON.");
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f5f0] px-5 py-12 text-ink sm:px-10 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.2em] text-stone">PC Photography</p>
        <h1 className="font-display mt-3 text-5xl">Content admin</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone">
          Manage hero media, film thumbnails and videos, India map thumbnails, and gratitude notes.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <input
            value={token}
            onChange={(event) => setToken(event.target.value)}
            type="password"
            placeholder="Admin token"
            className="min-h-11 flex-1 border border-black/15 bg-white px-4 text-sm outline-none focus:border-ink"
          />
          <button
            type="button"
            onClick={() => {
              window.localStorage.setItem("admin-token", token);
              loadContent(token);
            }}
            className="bg-ink px-6 py-3 text-sm text-paper"
          >
            Load content
          </button>
        </div>

        {content && (
          <div className="mt-10 grid gap-6 lg:grid-cols-[180px_1fr]">
            <nav className="flex gap-2 overflow-x-auto lg:flex-col">
              {sections.map((section) => (
                <button
                  key={section}
                  type="button"
                  onClick={() => selectSection(section)}
                  className={`shrink-0 border px-4 py-3 text-left text-sm capitalize ${active === section ? "border-ink bg-ink text-paper" : "border-black/15 bg-white"}`}
                >
                  {section}
                </button>
              ))}
            </nav>
            <section className="bg-white p-5 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-display text-2xl capitalize">{active}</h2>
                <button type="button" onClick={save} className="bg-ember px-5 py-2.5 text-sm text-paper">
                  Save section
                </button>
              </div>
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                spellCheck={false}
                className="mt-5 min-h-[520px] w-full border border-black/10 bg-[#fbfaf7] p-4 font-mono text-xs leading-relaxed outline-none focus:border-ink"
              />
              <p className="mt-3 text-xs text-stone">{message}</p>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
