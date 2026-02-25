"use client";

import { useEffect, useMemo, useState } from "react";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export default function Countdown() {
  // Wedding date: April 28, 2026 (local time)
  const target = useMemo(() => new Date(2026, 3, 28, 0, 0, 0), []); // month is 0-based (3 = April)

  const [now, setNow] = useState(() => new Date());
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = target.getTime() - now.getTime();

  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  useEffect(() => {
    if (diff <= 0 && !done) setDone(true);
  }, [diff, done]);

  return (
    <section className="relative py-28 px-6 bg-primary/20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl text-accent font-theseasons">
          Countdown
        </h2>
        <p className="mt-4 md:text-xl text-darkgrey/80 max-w-2xl mx-auto">
          Counting down to our special day.
        </p>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
          <TimeCard label="Days" value={String(days)} />
          <TimeCard label="Hours" value={pad2(hours)} />
          <TimeCard label="Minutes" value={pad2(minutes)} />
          <TimeCard label="Seconds" value={pad2(seconds)} />
        </div>

        {done && (
          <div className="mt-10 inline-flex items-center justify-center rounded-full bg-primary/30 px-6 py-3 text-darkgrey">
            Today is the day 💜
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <div className="h-px w-24 bg-accent/30" />
        </div>
      </div>
    </section>
  );
}

function TimeCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[28px] border border-accent/15 bg-white shadow-sm px-6 py-8">
      <div className="text-4xl md:text-5xl text-accent">
        {value}
      </div>
      <div className="mt-2 text-sm md:text-base text-darkgrey/70 tracking-wide uppercase">
        {label}
      </div>
    </div>
  );
}