"use client";

import { useEffect, useState } from "react";

const images = [
  "/slide1.jpeg",
  "/slide2.jpeg",
  "/slide3.jpg",
  "/slide4.jpg",
  "/slide5.jpg",
];

export default function Slideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* Slides */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* White Overlay 30% */}
      <div className="absolute inset-0 bg-white/30" />

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <p className="text-lg md:text-2xl text-white tracking-wide text-shadow-2xs text-shadow-rose-500/80">
          You are invited to the wedding of
        </p>

        <h1 className="mt-6 text-5xl md:text-7xl text-white text-shadow-2xs text-shadow-rose-500/80">
          Ros & Shai
        </h1>
      </div>

    </section>
  );
}