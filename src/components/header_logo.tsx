import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {

    //console.log("HeaderLogo component rendered");

    return (
    <div className="flex items-center flex-shrink-0">
            <Link href="/">
                <Image
                    src="/greentouch-logo.svg"
                alt="GreenTouch Logo"
                width={50}
                height={50}
            />
        </Link>
    </div>
  )
}