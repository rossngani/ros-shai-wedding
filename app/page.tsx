import ViewInvitationButton from "./components/ViewInvitationButton";

export default function LandingPage() {
  return (
    <main className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/landing-bg.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-5xl md:text-7xl font-light tracking-wide">
          Ros & Shai
        </h1>

        <p className="mt-4 text-lg md:text-2xl">
          April 28, 2026
        </p>

        <ViewInvitationButton />
      </div>
    </main>
  );
}