import Link from "next/link";

export const HeaderNavigationLinks = () => {
  
  //console.log("HeaderAuthentication component rendered");

  return (
    <nav className="hidden lg:flex space-x-6 text-sm font-medium text-gray-700">
      <Link href="/discover-greentouch">Discover GreenTouch</Link>
      <Link href="/sessions">Sessions</Link>
      <Link href="/nature-video-gallery">Nature Video Gallery</Link>
      <Link href="/news">News</Link>
      <Link href="/resources">Resources</Link>
    </nav>
  )
}