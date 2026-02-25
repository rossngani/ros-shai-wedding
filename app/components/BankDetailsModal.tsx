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
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
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
      <div className="relative w-full max-w-lg rounded-[28px] bg-white shadow-xl border border-accent/20 overflow-hidden">
        <div className="px-8 py-7 border-b border-accent/10">
          <h3 className="text-2xl text-accent font-theseasons">Bank Details</h3>
          <p className="mt-2 text-darkgrey/80 text-sm">
            Thank you for your love and support.
          </p>
        </div>

        <div className="px-8 py-7 space-y-5">
          <div>
            <p className="text-sm text-darkgrey/70">Bank Name</p>
            <p className="text-lg text-darkgrey">MariBank Philippines</p>
          </div>

          <div>
            <p className="text-sm text-darkgrey/70">Account Name</p>
            <p className="text-lg text-darkgrey">Shaira Talla</p>
          </div>

          <div>
            <p className="text-sm text-darkgrey/70">Account Number</p>
            <p className="text-lg text-darkgrey tracking-wide">1204 547 3588</p>
          </div>

          <div className="pt-3">
            <button
              onClick={onClose}
              className="w-full rounded-full bg-accent text-white py-3 hover:bg-secondary transition font-theseasons"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}