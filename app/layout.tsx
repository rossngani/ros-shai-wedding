import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const theSeasons = localFont({
  src: [
    {
      path: "../public/fonts/theseasons-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/theseasons-bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-the-seasons",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ros and Shai's Wedding",
  description:
    "Join us in celebrating the wedding of Ros and Shai on April 28, 2026. View our invitation and RSVP to share in our special day!",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${theSeasons.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}