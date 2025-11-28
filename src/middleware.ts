import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { getSessionCookie } from "better-auth/cookies";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {

	const response = intlMiddleware(request);

	const pathname = request.nextUrl.pathname;

	const protectedRoutes = [
		"/nature-video-gallery",
		"/nature-video-gallery/",
		"/nature-video-gallery/(.*)",
		"/news",
		"/resources",
		"/account",
	];

	const isProtected = protectedRoutes.some((path) =>
		new RegExp(`^${path.replace(/\*/g, ".*")}$`).test(pathname)
	);

	if (isProtected) {

		const sessionCookie = getSessionCookie(request);

		// THIS IS NOT SECURE!
		// This is the recommended approach to optimistically redirect users
		// We recommend handling auth checks in each page/route
		if (!sessionCookie) {
			return NextResponse.redirect(new URL("/sign-in", request.url));
		}
	}

  	return response;
}

export const config = {
	matcher: [
		"/((?!api|trpc|_next|_vercel|.*\\..*).*)",
	],
};
