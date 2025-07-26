import Link from "next/link";

export const HeaderAuthentication = () => {
    
  //console.log("HeaderAuthentication component rendered");

  return (
    <div className="flex items-center space-x-4 flex-shrink-0">
        {/* Buttons */}
        <Link href="/register" className="text-sm font-medium text-gray-700 hover:text-green-600">
            Register
        </Link>

        <Link
        href="/login" className="bg-green-600 text-white px-4 py-2 rounded text-sm font-medium">
            Sign in
        </Link>
    </div>
  );
};
