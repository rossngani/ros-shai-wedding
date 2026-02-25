"use client";

import { useEffect } from "react";

export default function ParallaxBackground() {
  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;

      const scrollY = window.scrollY;

      document.querySelectorAll<HTMLElement>("[data-parallax-bg]").forEach((el) => {
        const speed = Number(el.dataset.parallaxSpeed ?? "0.18");

        // Element's position in the document
        const elTop = el.offsetTop;
        const elHeight = el.offsetHeight;

        // Distance scrolled relative to this section
        const relativeY = scrollY - elTop;

        // Calculate parallax offset
        const offset = -relativeY * speed;

        // Clamp so it doesn't jump too much (prevents the band you saw)
        const maxShift = elHeight * 0.25; // adjust 0.15–0.35
        const clamped = Math.max(-maxShift, Math.min(maxShift, offset));

        el.style.backgroundPosition = `center ${clamped}px`;
        el.style.backgroundRepeat = "no-repeat";
        el.style.backgroundSize = "cover";
      });
    };

    const onScrollOrResize = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return null;
}