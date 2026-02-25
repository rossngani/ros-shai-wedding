"use client";

import { useState } from "react";
import BankDetailsModal from "./BankDetailsModal";

export default function WeddingDetails() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-wedding-details.jpg')" }}
      />
      <div className="absolute inset-0 z-0 bg-white/50 md:bg-white/70" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl text-accent font-theseasons">Wedding Details</h2>
          <p className="mt-4 md:text-xl text-darkgrey/80 max-w-2xl mx-auto">
            We can’t wait to celebrate with you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-6">
            <div className="rounded-[28px] bg-white/90 border border-accent/15 shadow-sm p-8">
              <h3 className="text-2xl text-accent mb-4 font-theseasons">Ceremony</h3>
              <div className="space-y-2 text-darkgrey">
                <p><span className="text-darkgrey/70">Date:</span> April 28, 2026</p>
                <p><span className="text-darkgrey/70">Time:</span> 8:00 AM</p>
                <p><span className="text-darkgrey/70">Venue:</span> Office of the Mayor, San Jose Baggao Hall</p>
                <p className="text-darkgrey/70 mt-3">
                  Attire: Formal / Semi-formal (optional)
                </p>
              </div>
            </div>

            <div className="rounded-[28px] bg-white/90 border border-accent/15 shadow-sm p-8">
              <h3 className="text-2xl text-accent mb-4 font-theseasons">Reception</h3>
              <div className="space-y-2 text-darkgrey">
                <p><span className="text-darkgrey/70">Time:</span> 10:00 AM</p>
                <p><span className="text-darkgrey/70">Venue:</span> D' Rest House Resort, Tungel, Baggao, Cagayan</p>
                <p className="text-darkgrey/70 mt-3">
                  Please arrive 15 minutes early.
                </p>
              </div>
            </div>
          </div>

 {/* Map */}
          <div className="rounded-[28px] overflow-hidden border border-accent/15 shadow-sm bg-white/90">
            <div className="p-6 border-b border-accent/10">
              <h3 className="text-2xl text-accent font-theseasons">Location</h3>
              <p className="mt-2 text-darkgrey/70 text-sm">
                Use the map below for directions.
              </p>
            </div>


            <div className="h-[360px] md:h-[440px]">
              <iframe
                title="Wedding Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.404819619982!2d121.88031396745721!3d17.88484332002414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3385eda036301b05%3A0x259474feb4e04ab8!2sD%27%20Rest%20House!5e1!3m2!1sen!2sph!4v1771987427791!5m2!1sen!2sph"
    className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Static map image
            <img src="/map.jpg" alt="Map" className="w-full h-[360px] md:h-[440px] object-cover" />
            */}
          </div>
        </div>

{/* button */}
        <div className="mt-14 text-center">
          <p className="max-w-3xl mx-auto text-darkgrey leading-relaxed">
            <span className="text-accent">
              Your presence is the best gift,
            </span>{" "}
            but if you can't come and still want to contribute to our future,
            our bank details are below.
          </p>

          <button
            onClick={() => setOpen(true)}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-accent text-white px-8 py-3 hover:bg-secondary transition font-theseasons"
          >
            View Bank Details
          </button>
        </div>
      </div>

      <BankDetailsModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}