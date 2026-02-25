"use client";

import Link from "next/link";

export default function ViewInvitationButton() {
  return (
    <Link
      href="/invitation"
      onClick={() => {
        localStorage.setItem("wedding_music_autoplay", "1");
      }}
      className="mt-8 px-8 py-3 border border-white rounded-full hover:bg-white hover:text-black transition duration-300 font-theseasons"
    >
      View Invitation
    </Link>
  );
}