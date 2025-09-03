// src/app/api/security/revoke-other-sessions/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {

  const session = await auth.api.getSession({
    headers: req.headers,
    query: {
      disableCookieCache: true,
    },
  });
  if (!session){
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } 

  await auth.api.revokeOtherSessions({ headers: req.headers });

  return NextResponse.json({ ok: true });
}
