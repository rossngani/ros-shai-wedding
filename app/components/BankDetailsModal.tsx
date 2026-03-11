"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function BankDetailsModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6 py-8"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-label="Close"
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl rounded-[28px] bg-white shadow-xl border border-accent/20 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="px-8 py-7 border-b border-accent/10 text-center">
          <h3 className="text-2xl md:text-3xl text-accent font-theseasons">
            Gift Contribution
          </h3>
          <p className="mt-2 text-darkgrey/80 text-sm md:text-base">
            Thank you for your love and support.
          </p>
          <p className="mt-1 text-darkgrey/70 text-sm">
            You may scan either QR code below.
          </p>
        </div>

        <div className="px-8 py-8 grid md:grid-cols-2 gap-8">
          {/* MariBank */}
          <div className="rounded-[24px] border border-accent/15 shadow-sm p-6 text-center bg-white">
            <h4 className="text-xl text-accent font-theseasons mb-4">
              MariBank
            </h4>

            <div className="rounded-[20px] overflow-hidden border border-accent/10 bg-white">
              <img
                src="/maribank-qr.jpg"
                alt="MariBank QR Code"
                className="w-full h-auto object-contain"
              />
            </div>

            <p className="mt-4 text-darkgrey/70 text-sm">
              Scan to send your gift via MariBank.
            </p>
          </div>

          {/* UnionBank */}
          <div className="rounded-[24px] border border-accent/15 shadow-sm p-6 text-center bg-white">
            <h4 className="text-xl text-accent font-theseasons mb-4">
              UnionBank
            </h4>

            <div className="rounded-[20px] overflow-hidden border border-accent/10 bg-white">
              <img
                src="/unionbank-qr.jpg"
                alt="UnionBank QR Code"
                className="w-full h-auto object-contain"
              />
            </div>

            <p className="mt-4 text-darkgrey/70 text-sm">
              Scan to send your gift via UnionBank.
            </p>
          </div>
        </div>

        <div className="px-8 pb-8">
          <button
            onClick={onClose}
            className="w-full rounded-full bg-accent text-white py-3 hover:bg-secondary transition font-theseasons"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}