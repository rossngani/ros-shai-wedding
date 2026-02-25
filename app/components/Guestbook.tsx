"use client";

import { useEffect, useState } from "react";

type Entry = {
  name: string;
  message: string;
  createdAt: string;
};

export default function Guestbook() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [status, setStatus] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/guestbook", { cache: "no-store" });
      const data = await res.json();
      setEntries(data.entries ?? []);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    const n = name.trim();
    const m = message.trim();

    if (!n || !m) {
      setStatus({ type: "err", text: "Please enter your name and a message." });
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: n, message: m }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: "err", text: data?.error ?? "Something went wrong." });
        return;
      }

      setName("");
      setMessage("");
      setStatus({ type: "ok", text: "Thank you! Your message has been sent." });
      fetchEntries();
    } catch {
      setStatus({ type: "err", text: "Network error. Please try again." });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="relative py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
{/* header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl text-accent font-theseasons">Guestbook</h2>
          <p className="mt-4 md:text-xl text-darkgrey/80 max-w-2xl mx-auto">
            Leave a message for the bride and groom.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
{/* form */}
          <div className="rounded-[28px] border border-accent/15 bg-white shadow-sm p-8">
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-darkgrey/70 mb-2">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={60}
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-accent/20 px-4 py-3 outline-none focus:border-accent bg-white"
                />
              </div>

              <div>
                <label className="block text-sm text-darkgrey/70 mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={500}
                  rows={5}
                  placeholder="Write your message…"
                  className="w-full rounded-2xl border border-accent/20 px-4 py-3 outline-none focus:border-accent bg-white resize-none"
                />
                <div className="mt-2 text-xs text-darkgrey/60 text-right">
                  {message.length}/500
                </div>
              </div>

              {status && (
                <div
                  className={`rounded-2xl px-4 py-3 text-sm ${
                    status.type === "ok"
                      ? "bg-primary/30 text-darkgrey"
                      : "bg-secondary/20 text-darkgrey"
                  }`}
                >
                  {status.text}
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-full bg-accent text-white py-3 hover:bg-secondary transition disabled:opacity-60 font-theseasons"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

{/* msg */}
          <div className="rounded-[28px] border border-accent/15 bg-white shadow-sm p-8">
            <h3 className="text-2xl text-accent font-theseasons mb-6">Messages</h3>

            {loading ? (
              <p className="text-darkgrey/70">Loading messages...</p>
            ) : entries.length === 0 ? (
              <p className="text-darkgrey/70">No messages yet. Be the first 😊</p>
            ) : (
              <div className="space-y-5 max-h-[520px] overflow-auto pr-2">
                {entries.map((entry, idx) => (
                  <div key={idx} className="rounded-2xl border border-accent/10 p-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-accent font-theseasons text-lg">{entry.name}</p>
                      <p className="text-xs text-darkgrey/60">
                        {new Date(entry.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <p className="mt-3 text-darkgrey leading-relaxed whitespace-pre-wrap">
                      {entry.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

{/* divider */}
        <div className="mt-16 flex justify-center">
          <div className="h-px w-24 bg-accent/30" />
        </div>
      </div>
    </section>
  );
}