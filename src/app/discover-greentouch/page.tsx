import Image from "next/image";

export default function DiscoverGreenTouch() {
  return (
    <main className="w-full text-gray-900 bg-white">
      {/* Hero section */}
      <section className="bg-[#0A3730] text-white px-6 py-16 pt-20">
        <div className="max-w-5xl mx-auto text-left">
          <h1 className="text-3xl font-semibold">About GreenTouch</h1>
          <p className="text-gl mt-8 mb-8">
            Welcome to GreenTouch, a digital tool designed to enhance your connection with nature, support mental well-being, and promote sustainable habits. Through interactive exercises and guided reflections, you will deepen your awareness of nature&apos;s impact on your well-being. 
            Your data privacy and security are our top priorities—your information is handled ethically and securely, following strict confidentiality guidelines.
          </p>
        </div>
      </section>

      <div className="relative bg-[#f5f5f5]">

        {/* Bottom-right tree */}
        <Image
          src="/tree.svg"
          alt="Decorative tree bottom left"
          width={300}
          height={300}
          className="absolute left-0 top-0 pointer-events-none transform -rotate-270 -scale-x-100 -scale-y-100 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px]"
        />

        {/* Bottom-right tree */}
        <Image
          src="/tree.svg"
          alt="Decorative tree bottom left"
          width={300}
          height={300}
          className="absolute bottom-0 right-0 pointer-events-none transform -scale-y-100 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px]"
        />

        {/* Sessions section */}
        <section className="relative z-10 px-6 py-20">
          <div className="max-w-5xl mx-auto text-left">
            <h2 className="text-2xl font-semibold mb-4">Sessions</h2>
            <p className="text-lg mb-10">
              During the GreenTouch program, you will participate in seven iterative sessions, each lasting three days. Below you will find the session titles. The sessions become available every three days—or every four days if a Sunday is included—one at a time, as you complete the previous ones.
            </p>

            <h2 className="text-xl font-semibold mb-8 text-center">List of available sessions:</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Session 1", about: "Noticing senses, thoughts, feelings, and memories related to nature" },
                { title: "Session 2", about: "Exploring a pleasant natural object" },
                { title: "Session 3", about: "Immersing in nature sounds" },
                { title: "Session 4", about: "Observing people in nature" },
                { title: "Session 5", about: "Breathing with a natural object" },
                { title: "Session 6", about: "Dancing with nature" },
                { title: "Session 7", about: "Finding a safe space in nature" },
              ].map((session, index) => (
                <div key={index} className="bg-white shadow rounded p-4">
                  <h3 className="text-green-800 font-semibold mb-4">{session.title}</h3>
                  <p className="text-sm font-semibold mt-1">About:</p>
                  <p>{session.about}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Project philosophy section */}
      <section className="bg-[#0A3730] text-white px-6 py-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
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
          <div className="space-y-6">
            <div className="md:transform md:translate-x-4">
              <Image
                src="/discover-greentouch-image-1.jpg"
                alt="Hands holding plant"
                width={500}
                height={300}
                className="rounded shadow w-auto"
              />
            </div>
            <div className="md:transform md:-translate-x-4">
              <Image
                src="/discover-greentouch-image-2.jpg"
                alt="Man working on laptop"
                width={500}
                height={300}
                className="rounded shadow w-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* EcoMind section */}
      <section className="bg-[#f5f5f5] px-6 py-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">EcoMind</h2>
            <p className="text-lg mb-4 text-gray-700">
              Get ready for the upcoming <b>EcoMind e-course</b>, set to launch in <b>2026</b> as part of the <b>Erasmus+ GreenTouch project</b>. This course will provide an opportunity to deepen your connection with nature through comprehensive knowledge and heightened ecological responsibility.
            </p>
            <p className="text-lg text-gray-700">
              The course will also explore how modern society&apos;s shift away from nature has led to a disconnection impacting both human and ecological health. Whether you wish to enrich your studies, integrate these insights into your lifestyle, or advance your career, this course will guide you toward a more mindful, sustainable connection with nature.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="/discover-greentouch-image-3.svg"
              alt="EcoMind leaf image"
              width={300}
              height={300}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
