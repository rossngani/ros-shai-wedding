export default function Gallery() {
  const photos = [
    { src: "/gallery1.jpg", className: "md:col-span-2 md:row-span-2" },
    { src: "/gallery2.jpeg", className: "md:col-span-1 md:row-span-1" },
    { src: "/gallery3.jpg", className: "md:col-span-1 md:row-span-1" },
    { src: "/gallery4.jpg", className: "md:col-span-1 md:row-span-2" },
    { src: "/gallery5.jpg", className: "md:col-span-2 md:row-span-1" },
    { src: "/gallery6.jpeg", className: "md:col-span-1 md:row-span-1" },
    { src: "/gallery7.jpeg", className: "md:col-span-1 md:row-span-1" },
    { src: "/gallery8.jpg", className: "md:col-span-1 md:row-span-1" },
  ];

  return (
    <section
        data-parallax-bg
        data-parallax-speed="0.18"
        className="relative py-28 px-6 overflow-hidden bg-center bg-scroll md:bg-fixed"
        style={{
            backgroundImage: "url('/bg-gallery.jpg')",
            backgroundPosition: "center 0px",
        }}
        >
  <div className="absolute inset-0 bg-white/50 md:bg-white/70 z-0" />
  <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl text-accent font-theseasons">Gallery</h2>
          <p className="mt-4 md:text-xl text-darkgrey/80 max-w-2xl mx-auto">
            A few moments we want to remember forever.
          </p>
        </div>
{/* grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[170px] md:auto-rows-[190px] gap-4 md:gap-5">
          {photos.map((p, idx) => (
            <div
              key={idx}
              className={`group relative overflow-hidden rounded-[28px] border border-accent/20 shadow-sm ${p.className}`}
            >
              <img
                src={p.src}
                alt={`Gallery ${idx + 1}`}
                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500" />

              <div className="absolute top-4 left-4 h-2 w-2 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition duration-500" />
            </div>
          ))}
        </div>
{/* devider */}
        <div className="mt-16 flex justify-center">
          <div className="h-px w-24 bg-accent/30" />
        </div>
      </div>
    </section>
  );
}