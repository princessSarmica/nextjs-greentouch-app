import Image from "next/image";
import Link from "next/link";

export default function NatureVideoGallery() {

  //console.log("Nature Video Gallery Page rendered");

  return (
    <main className="flex flex-col items-center justify-start w-full min-h-screen bg-[#f5f5f5] text-gray-900">
      
      {/* Hero section (textual content) */}
      <section className="w-full max-w-5xl px-4 pt-20">
        <h1 className="text-3xl font-bold mb-8 text-left">Nature Video Gallery</h1>
        <p className="text-lg mb-4 text-gray-700">
          Welcome to the GreenTouch Nature Video Gallery!
        </p>
        <p className="text-lg mb-4 text-gray-700">
          Here, you&apos;ll find a collection of nature&apos;s sounds and sights, each one showcasing the unique beauty of different natural elements. Whether you&apos;re drawn to the calming flow of water or the lively energy of rivers and waterfalls, the gallery has something for every mood. Fire crackles and glows to warm your spirit, air whispers through leaves and rustles branches, and earth comes alive with the soft crunch of footsteps and the vibrant rustle of underbrush. Experience animals in their natural symphony, from animal calls and birdsong to the hum of busy bees.
        </p>
        <p className="text-lg text-gray-700">
          Use these recordings to bring the outdoors inside, perfect for unwinding, studying, or enhancing indoor nature-based activities. Explore, save your favorite tracks in your diary, and let the essence of nature bring moments of peace and inspiration to your day. Enjoy every element&apos;s unique magic and let it refresh your mind and spirit.
        </p>
      </section>

      {/* Line divider + Heading */}
      <section className="w-full max-w-5xl px-4 mx-auto mt-12 mb-8">
        <h2 className="text-xl font-semibold mb-2">Categories</h2>
        <div className="border-t border-gray-300" />
      </section>

      {/* Categories grid */}
      <section className="w-full max-w-5xl px-4 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
            { name: "Water", href: "/nature-video-gallery/water" },
            { name: "Fire", href: "/nature-video-gallery/fire" },
            { name: "Air", href: "/nature-video-gallery/air" },
            { name: "Earth", href: "/nature-video-gallery/earth" },
            { name: "Animals", href: "/nature-video-gallery/animals" },
            ].map((item) => (
            <Link key={item.name} href={item.href} className="relative w-full aspect-[4/5] rounded-lg overflow-hidden shadow-lg group">
                <Image src={`/nature-video-gallery-${item.name}.jpg`} alt={`${item.name} image`} fill className="object-cover brightness-[0.9] will-change-transform group-hover:scale-110 transition-transform duration-300"/>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-[#f5f5f5]">
                  <h3 className="text-3xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-base underline">See more</p>
                </div>
            </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
