import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/get-session";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Resources() {

  //console.log("Resources Page rendered");

  const session = await getServerSession();

  if(!session) {
      redirect("/sign-in")
  }

  return (
    <main className="flex flex-col items-center justify-start w-full min-h-screen bg-[#f5f5f5] text-gray-900">

      {/* Hero section (textual content) */}
      <section className="w-full max-w-5xl px-4 pt-20">
        <h1 className="text-3xl font-bold mb-8 text-left">Resources</h1>
        <p className="text-lg mb-4 text-gray-700">
          Get ready to explore the resources we are developing as part of the GreenTouch project and consider how they could enrich your professional practice. Whether you are a faculty member, non-formal educator, or practitioner in the helping professions, these resources are designed to foster a deeper connection to nature and integrate ecological awareness into your work.
        </p>
        <p className="text-lg mb-4 text-gray-700">
          We especially encourage prospective and practicing psychologists, healthcare professionals, and those in the mental health and well-being sectors to leverage these resources to enhance therapeutic approaches and promote holistic care. <br />  We hope to inspire and empower you to bring ecological responsibility and well-being into your professional landscape.
        </p>
      </section>

      {/* Line divider */}
      <section className="w-full px-4">
        <div className="max-w-5xl border-t border-gray-300 mt-8 mb-8 mx-auto" />
      </section>

      {/* Articles card */}
      <section className="w-full max-w-5xl px-4 pb-20">
        <div className="bg-[#0A3730] text-white rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow">
          {/* Left - Text content */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-3">Articles</h2>
            <p className="text-base mb-4">
              Explore more in-depth knowledge by reading peer-reviewed scientific articles on the role of nature and nature connectedness, as well as nature-based and digital nature-based interventions. Delve into research that highlights the benefits and impacts these approaches have on well-being and ecological awareness.
            </p>
            <Button>
              <Link href="/resources/articles">
                Explore articles →
              </Link>
            </Button>
          </div>

          {/* Right - Icon */}
            <div className="w-[100px] h-[100px] p-1">
            <Image
                src="/paper-icon.svg"
                alt="Article icon"
                width={100}
                height={100}
                className="object-contain"
            />
            </div>
        </div>
      </section>
    </main>
  );
}
