import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  //console.log("Homepage rendered");
  
  // Simulate loading delay
  // await new Promise(resolve => setTimeout(resolve, 5000)); 

  return (
    <main className="flex flex-col items-center justify-start w-full bg-[#f5f5f5] text-gray-900">

      {/* Hero section */}
        <section className="relative w-full min-h-[90vh] flex justify-center text-center overflow-hidden px-4 py-10 md:py-16">
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
          <div className="z-10 max-w-3xl w-full text-white flex flex-col items-center justify-center">
            <h1 className="text-3xl md:text-4xl font-semibold mb-10">
              Reconnect with Nature, Relax Your Mind
            </h1>
            <p className="text-base md:text-lg mb-30">
              GreenTouch offers guided self-reflective exercises, outdoor challenges, and sustainable living tips to help you reduce stress, build mental resilience, and connect with nature.
            </p>
            <Button asChild variant={"default"} className="px-6 py-6">
              <Link href="/discover-greentouch">View GreenTouch Activities</Link>
            </Button> 
          </div>
        </section>

      {/* Project partners */}
      <section className="bg-[#0A3730] w-full py-12 px-6 flex flex-col items-center">
        <h2 className="text-white text-xl font-semibold mb-12">Our project partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-18 items-center justify-center">
          <Image src="/riga-uni.svg" alt="Riga University" width={180} height={180} />
          <Image src="/maribor-uni.svg" alt="University of Maribor" width={180} height={180} />
          <Image src="/forest-therapy-hub.svg" alt="Forest Therapy Hub" width={180} height={180} />
          <Image src="/cyprus-uni.svg" alt="Cyprus University" width={180} height={180} />
        </div>
      </section>
    </main>
  );
}
