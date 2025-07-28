import Image from "next/image";

export default function Home() {

  //console.log("Homepage rendered");

  return (
    <main className="flex flex-col items-center justify-start w-full bg-[#f5f5f5] text-gray-900">

      {/* Hero section */}
      <section className="relative w-full h-[90vh] flex items-center justify-center text-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/homepage-photo.jpg"
          alt="Forest background"
          fill
          sizes="100vw"
          className="object-cover brightness-[0.5] z-0"
          priority
        />

        {/* Hero content */}
        <div className="z-10 max-w-3xl px-4 text-white">
          <h1 className="text-3xl md:text-4xl font-semibold mb-10">
            Reconnect with Nature, Relax Your Mind
          </h1>
          <p className="text-base md:text-lg mb-30">
            GreenTouch offers guided self-reflective exercises, outdoor challenges, and sustainable living tips to help you reduce stress, build mental resilience, and connect with nature.
          </p>
          <button className="bg-[#65a164] hover:bg-green-600 text-white font-semibold px-6 py-3 rounded transition">
            View GreenTouch activities
          </button>
        </div>
      </section>


      {/* Project partners */}
      <section className="bg-[#0A3730] w-full py-12 px-6 flex flex-col items-center">
        <h2 className="text-white text-xl font-semibold mb-8">Our project partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-18 items-center justify-center">
          <Image src="/riga-uni.svg" alt="Riga University" width={160} height={60} />
          <Image src="/maribor-uni.svg" alt="University of Maribor" width={160} height={60} />
          <Image src="/forest-therapy-hub.svg" alt="Forest Therapy Hub" width={160} height={60} />
          <Image src="/cyprus-uni.svg" alt="Cyprus University" width={160} height={60} />
        </div>
      </section>

      {/* Wrapper for cards */}
      <section className="relative w-full bg-[#f5f5f5] py-20 px-4 flex flex-col items-center space-y-12 overflow-hidden">

        {/* Top-right tree */}
        <Image
          src="/tree.svg"
          alt="Decorative tree top right"
          width={300}
          height={300}
          className="absolute top-0 right-0 pointer-events-none w-[300px] h-[300px] lg:w-[400px] lg:h-[400px]"
        />

        {/* Bottom-left tree */}
        <Image
          src="/tree.svg"
          alt="Decorative tree bottom left"
          width={300}
          height={300}
          className="absolute -bottom-12 left-0 pointer-events-none transform -scale-x-100 -scale-y-100 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px]"
        />

        {/* Cards section */}
        <div className="max-w-6xl w-full space-y-8 z-10">

          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow p-10">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Welcome to GreenTouch! &#127807;</h3>
            <p className="text-base md:text-lg">
              GreenTouch is all about helping you connect with nature, boost your well-being, and build a more sustainable future—all through interactive digital tools and hands-on experiences. Our Erasmus+ cooperation partnership project, &quot;GreenTouch: EcoMind Development for Higher Education Future&quot; (Project ID: 2023-1-LV01-KA220-HED-000154847), brings together universities and experts from across Europe to create innovative ways to integrate nature into education and everyday life.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow p-10">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Who&apos;s Behind GreenTouch? &#127963;</h3>
            <p className="mb-2 text-base md:text-lg">We&apos;re a team of passionate educators, researchers, and innovators from:</p>
            <ul className="list-disc pl-6 space-y-1 text-base md:text-lg">
              <li>Riga Stradiņš University (Latvia)</li>
              <li>University of Maribor (Slovenia)</li>
              <li>FOREHUB LDA (Portugal)</li>
              <li>Cyprus University of Technology (Cyprus)</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow p-10">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">What&apos;s Our Mission? &#127775;</h3>
            <p className="mb-2 text-base md:text-lg">We want to make it easier for students, educators, and communities to engage with nature in meaningful ways.</p>
            <p className="mb-2 text-base md:text-lg">That means:</p>
            <ul className="list-disc pl-6 space-y-1 text-base md:text-lg">
              <li>Developing GreenTouch, a digital tool packed with interactive exercises, videos, and creative tasks.</li>
              <li>Creating an EcoMind e-course that blends theory with outdoor experiences.</li>
              <li>Building a network to share ideas, research, and best practices for nature-based well-being.</li>
            </ul>
            <p className="mt-4 text-base md:text-lg">Join us! Follow along and take part in our activities!</p>
          </div>

        </div>
      </section>
    </main>
  );
}
