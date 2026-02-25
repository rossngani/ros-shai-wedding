"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

type Stats = {
  attending: number;
  notAttending: number;
  totalGuests: number;
};

export default function RSVP() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no" | "">("");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");

  const [stats, setStats] = useState<Stats>({ attending: 0, notAttending: 0, totalGuests: 0 });
  const [loadingStats, setLoadingStats] = useState(true);

  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string>("");

  const loadStats = async () => {
    try {
      setLoadingStats(true);
      const res = await fetch("/api/rsvp", { cache: "no-store" });
      const data = await res.json();
      if (data?.stats) setStats(data.stats);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const fireConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      startVelocity: 30,
      origin: { y: 0.7 },
    });
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 90,
        startVelocity: 22,
        origin: { y: 0.7 },
      });
    }, 250);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const n = name.trim();
    if (!n) return setError("Please enter your name.");
    if (!attendance) return setError("Please select your attendance.");

    if (attendance === "yes" && (guests < 1 || guests > 5)) {
      return setError("Number of guests must be between 1 and 5.");
    }

    setSending(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: n,
          attendance,
          guests: attendance === "yes" ? guests : 0,
          message: message.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Something went wrong.");
        return;
      }

      setSubmitted(true);
      fireConfetti();
      await loadStats();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="relative py-28 px-6  bg-primary/20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl text-accent font-theseasons">RSVP</h2>
        <p className="mt-4 md:text-xl text-darkgrey/80">
          Kindly let us know if you will be joining us.
        </p>

{/* Counters */}
        {/* <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Attending"
            value={loadingStats ? "—" : String(stats.attending)}
          />
          <StatCard
            label="Not Attending"
            value={loadingStats ? "—" : String(stats.notAttending)}
          />
          <StatCard
            label="Total Guests"
            value={loadingStats ? "—" : String(stats.totalGuests)}
          />
        </div> */}

        <div className="mt-14 rounded-[32px] border border-accent/15 shadow-sm bg-white p-10 text-left">
          {submitted ? (
            <div className="text-center py-12">
              <p className="text-2xl text-accent font-theseasons">
                Thank you for your response 💜
              </p>
              <p className="mt-4 text-darkgrey/80">
                We’re excited to celebrate with you.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName("");
                  setAttendance("");
                  setGuests(1);
                  setMessage("");
                }}
                className="mt-8 inline-flex items-center justify-center rounded-full border border-accent/30 px-8 py-3 text-accent hover:bg-primary/20 transition font-theseasons"
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm mb-2 text-darkgrey/70">Full Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={60}
                  className="w-full rounded-2xl border border-accent/20 px-4 py-3 focus:border-accent outline-none"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-darkgrey/70">Will you attend?</label>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={attendance === "yes"}
                      onChange={() => setAttendance("yes")}
                    />
                    Yes, I will attend
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={attendance === "no"}
                      onChange={() => setAttendance("no")}
                    />
                    Sorry, I can't attend
                  </label>
                </div>
              </div>

              {attendance === "yes" && (
                <div>
                  <label className="block text-sm mb-2 text-darkgrey/70">Number of Guests</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full rounded-2xl border border-accent/20 px-4 py-3 focus:border-accent outline-none"
                  />
                  <p className="mt-2 text-xs text-darkgrey/60">
                    Max 5 guests per response (you can change this).
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm mb-2 text-darkgrey/70">
                  Message / Dietary Restrictions
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={500}
                  className="w-full rounded-2xl border border-accent/20 px-4 py-3 focus:border-accent outline-none resize-none"
                  placeholder="Optional message..."
                />
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-full bg-accent text-white py-3 hover:bg-secondary transition font-theseasons disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send RSVP"}
              </button>
            </form>
          )}
        </div>

        <div className="mt-16 flex justify-center">
          <div className="h-px w-24 bg-accent/30" />
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-accent/15 bg-white shadow-sm px-6 py-6 text-center">
      <div className="text-3xl text-accent font-theseasons">{value}</div>
      <div className="mt-1 text-sm text-darkgrey/70 tracking-wide uppercase">{label}</div>
    </div>
  );
}