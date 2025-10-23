import Image from "next/image";

export default function DiscoverGreenTouch() {

  //console.log("Discover GreenTouch Page rendered");

  return (
    <main className="w-full text-gray-900 bg-[#f5f5f5]  min-h-screen">
      <div>
        {/* Top gradient header */}
        <section className="bg-gradient-to-r from-[#0A3730] to-[#1F6E4C] text-white pb-10 pt-20">
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-left">Welcome to GreenTouch</h1>
          </div>
        </section>

        {/* Hero section (textual content + tree) */}
        <div className="relative bg-[#f5f5f5] overflow-hidden pb-20">
          <div className="max-w-5xl mx-auto text-left pt-6 w-full px-4 space-y-10 relative z-10">
            {/* Hero text */}
            <div>
              <p className="text-lg mt-8 mb-12">
                GreenTouch is all about helping you connect with nature, boost your well-being, and build a more sustainable future—all through interactive digital tools and hands-on experiences. Our Erasmus+ cooperation partnership project, &quot;GreenTouch: EcoMind Development for Higher Education Future&quot; (Project ID: 2023-1-LV01-KA220-HED-000154847), brings together universities and experts from across Europe to create innovative ways to integrate nature into education and everyday life.
              </p>
            </div>

            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-2xl font-semibold mb-4">Who&apos;s Behind GreenTouch?</h3>
              <p className="mb-2 text-base">
                We&apos;re a team of passionate educators, researchers, and innovators from:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-base">
                <li>Riga Stradiņš University (Latvia)</li>
                <li>University of Maribor (Slovenia)</li>
                <li>FOREHUB LDA (Portugal)</li>
                <li>Cyprus University of Technology (Cyprus)</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-2xl font-semibold mb-4">What&apos;s Our Mission?</h3>
              <p className="mb-2 text-base">
                We want to make it easier for students, educators, and communities to engage with nature in meaningful ways.
              </p>
              <p className="mb-2 text-base">That means:</p>
              <ul className="list-disc pl-6 space-y-1 text-base">
                <li>Developing GreenTouch, a digital tool packed with interactive exercises, videos, and creative tasks.</li>
                <li>Creating an EcoMind e-course that blends theory with outdoor experiences.</li>
                <li>Building a network to share ideas, research, and best practices for nature-based well-being.</li>
              </ul>
              <p className="mt-4 text-base">
                Join us! Follow along and take part in our activities!
              </p>
            </div>
          </div>

          {/* Bottom-right tree */}
          <Image
            src="/tree.svg"
            alt="Decorative tree bottom right"
            width={25}
            height={25}
            className="absolute bottom-0 right-0 pointer-events-none w-[300px] h-[300px] md:w-[600px] md:h-[600px]"
          />
        </div>

      </div>

      {/* Project philosophy section */}
      <section className="bg-[#0A3730] text-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 items-stretch">
          {/* Text content */}
          <div className="pl-6 pr-16 py-20 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4">Projects philosophy</h2>
            <p className="text-base mb-8">
              The GreenTouch project is built on the idea that connecting with nature enhances well-being, fosters resilience, and supports sustainability. We believe that nature plays a vital role in mental, emotional, and social health, and even small moments of connection can have a lasting impact.
            </p>
            <p className="text-base mb-8">
              By integrating nature-based experiences with digital innovation, we make this connection accessible to individuals in diverse environments, helping them build a deeper relationship with the natural world.
            </p>
            <p className="text-base mb-8">
              Through research, education, and interactive tools, GreenTouch promotes nature connectedness and well-being, encouraging sustainable lifestyles and holistic approaches to mental health.
            </p>
            <p className="text-base mb-8">
              Curious about the science behind it? Explore research on nature&apos;s impact on well-being, nature connectedness, and digital nature-based interventions.
            </p>
          </div>

          {/* Image column */}
          <div className="relative">
            <Image
              src="/discover-greentouch-image-1.jpg"
              alt="Hands holding plant"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* EcoMind section */}
      <section className="bg-[#f5f5f5] px-6 py-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center">
            <Image
              src="/discover-greentouch-image-2.svg"
              alt="EcoMind leaf image"
              width={350}
              height={350}
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-8">EcoMind</h2>
            <p className="text-lg mb-4 text-gray-700">
              Get ready for the upcoming <b>EcoMind e-course</b>, set to launch in <b>2026</b> as part of the <b>Erasmus+ GreenTouch project</b>. This course will provide an opportunity to deepen your connection with nature through comprehensive knowledge and heightened ecological responsibility.
            </p>
            <p className="text-lg text-gray-700">
              The course will also explore how modern society&apos;s shift away from nature has led to a disconnection impacting both human and ecological health. Whether you wish to enrich your studies, integrate these insights into your lifestyle, or advance your career, this course will guide you toward a more mindful, sustainable connection with nature.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
