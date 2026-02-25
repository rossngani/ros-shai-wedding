"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<number | null>(null);

  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  const setVolumeSafely = (v: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = Math.max(0, Math.min(1, v));
  };

  const fadeIn = (targetVolume = 0.4, durationMs = 1200) => {
    if (!audioRef.current) return;

    if (fadeTimerRef.current) {
      window.clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }

    const steps = 24;
    const stepMs = Math.floor(durationMs / steps);
    const stepVol = targetVolume / steps;

    setVolumeSafely(0);

    let current = 0;
    fadeTimerRef.current = window.setInterval(() => {
      current += stepVol;
      setVolumeSafely(current);

      if (current >= targetVolume) {
        setVolumeSafely(targetVolume);
        if (fadeTimerRef.current) window.clearInterval(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }
    }, stepMs);
  };

  const playWithFade = async () => {
    if (!audioRef.current) return;

    try {
      audioRef.current.loop = true;
      fadeIn(0.4, 1200);
      await audioRef.current.play();
      setPlaying(true);
    } catch {
      // autoplay blocked - user can press button
      setPlaying(false);
    }
  };

  const pauseMusic = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setPlaying(false);
  };

  const toggle = async () => {
    if (!audioRef.current) return;
    if (playing) pauseMusic();
    else await playWithFade();
  };

  // Start music if user came from "View Invitation"
  useEffect(() => {
    setReady(true);
    const shouldPlay = localStorage.getItem("wedding_music_autoplay") === "1";
    if (shouldPlay) {
      localStorage.removeItem("wedding_music_autoplay");
      playWithFade();
    } else {
      // set soft default volume even if not playing yet
      setVolumeSafely(0.4);
    }

    return () => {
      if (fadeTimerRef.current) window.clearInterval(fadeTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ready) return null;

  return (
    <>
      <audio ref={audioRef} src="/music.mp3" preload="auto" />

      {/* Vinyl Button */}
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full
                   bg-black shadow-xl border border-white/20
                   flex items-center justify-center
                   hover:scale-[1.03] active:scale-[0.98] transition"
        aria-label={playing ? "Pause music" : "Play music"}
      >
        {/* Vinyl */}
        <div
          className={`relative w-12 h-12 rounded-full bg-darkgrey
                      ${playing ? "animate-spin-slow" : ""}`}
        >
          {/* record rings */}
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-2 rounded-full border border-white/10" />
          <div className="absolute inset-4 rounded-full border border-white/10" />

          {/* center label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-secondary" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-white" />
          </div>
        </div>

        {/* Play icon overlay when paused */}
        {!playing && (
          <div className="absolute text-white text-xs font-semibold">
            ▶
          </div>
        )}
      </button>
    </>
  );
}