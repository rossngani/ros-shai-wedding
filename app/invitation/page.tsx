import Slideshow from "../components/Slideshow";
import Gallery from "../components/Gallery";
import WeddingDetails from "../components/WeddingDetails";
import ParallaxBackground from "../components/ParallaxBackground";
import Guestbook from "../components/Guestbook";
import Countdown from "../components/Countdown";
import BackgroundMusic from "../components/BackgroundMusic";
import Reveal from "../components/Reveal";
import RSVP from "../components/RSVP";

export default function InvitationPage() {
  return (
    <main className="bg-white text-darkgrey">
    <BackgroundMusic />
    <ParallaxBackground />
    <Slideshow />
{/* details */}
    <section
        className="relative py-28 px-6 overflow-hidden 
                    bg-cover bg-center 
                    md:bg-fixed"
        style={{ backgroundImage: "url('/bg-section.jpg')" }}
        >

        {/* Softer overlay on mobile, stronger on desktop */}
        <div className="absolute inset-0 bg-white/70 md:bg-white/80 -z-10"></div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

            {/* LEFT SIDE - Images */}
            <div className="relative flex flex-col md:block items-center">

            {/* Groom Image */}
            <div className="relative w-80 md:w-96 h-[480px] md:h-[520px] rounded-[32px] overflow-hidden border border-accent shadow-md">
                <img
                src="/groom.jpg"
                alt="Groom"
                className="w-full h-full object-cover"
                />
            </div>

            {/* Bride Image */}
            <div className="
                relative
                mt-10
                md:absolute md:bottom-0 md:right-[-80px]
                w-72 md:w-80
                h-[420px]
                rounded-[32px]
                overflow-hidden
                border border-accent
                shadow-lg
                bg-white
            ">
                <img
                src="/bride.jpg"
                alt="Bride"
                className="w-full h-full object-cover"
                />
            </div>

            </div>

            {/* RIGHT SIDE - Text */}
            <div className="space-y-16 md:pl-20 text-center md:text-left mt-16 md:mt-0">

            <div>
                <h3 className="text-3xl md:text-4xl text-accent mb-6 font-theseasons">
                The Groom
                </h3>
                <p className="md:text-2xl leading-relaxed text-darkgrey">
                Rosefield <br />
                Son of Mr. & Mrs. Uton <br />
                A loving, passionate, and devoted partner.
                </p>
            </div>

            <div>
                <h3 className="text-3xl md:text-4xl text-accent mb-6 font-theseasons">
                The Bride
                </h3>
                <p className="md:text-2xl leading-relaxed text-darkgrey">
                Shaira <br />
                Daughter of Mr. & Mrs. Talla <br />
                Graceful, kind-hearted, and full of love.
                </p>
            </div>

            </div>

        </div>

    </section>
    
{/* story */}
    <Reveal>
    <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-primary/20">
        <div className="max-w-3xl text-center">

            <h2 className="text-4xl md:text-5xl mb-8 text-accent font-theseasons">
            Our Story
            </h2>

            <p className="text-base md:text-2xl leading-relaxed text-gray-700">
            We first met in college as classmates during our first year, never knowing
            that we would share the same classroom until graduation. What started as
            casual conversations slowly grew into something special.
            <br /><br />
            In our second year, we became best friends — sharing dreams, challenges,
            and countless unforgettable memories. Our friendship blossomed into love,
            and in June 2016, we officially began our journey together.
            <br /><br />
            Through the years, we grew not only as individuals but as partners —
            supporting each other through every season of life. In 2024, we said “yes”
            to forever and got engaged, ready to begin our next chapter as one.
            </p>
        </div>
    </section>
    </Reveal>

{/* gallery */}
     <Gallery />

{/* wedding details */}
    <Reveal>
    <WeddingDetails />
    </Reveal>

{/* guestbook */}
    <Reveal>
    <Guestbook />
    </Reveal>

{/* rsvp */}
    <Reveal>
    <RSVP />
    </Reveal>

{/* countdown */}
    <Reveal>
    <Countdown />
    </Reveal>

{/* footer */}
      <footer className="py-16 text-center bg-accent text-white px-6">
        <p className="text-2xl mb-4">Thank you</p>
        <p className="max-w-2xl mx-auto">
          It is an honor and happiness for us if you are willing to be present
          to give your blessing to the bride and groom.
        </p>
      </footer>

    </main>
  );
}