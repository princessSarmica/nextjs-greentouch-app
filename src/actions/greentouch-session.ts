"use server"

import { getServerSession } from "@/lib/get-session";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function setGreentouchSessionReleaseDate(name: string, releaseDate: Date) {
  try {
    const session = await getServerSession();

    if (!session) {
        console.error("User not authenticated");
        return {success:false, error: "User not authenticated"};
    }
    
    if(session.user.role !== "admin") {
        console.error("Unauthorized access attempt");
        return {success:false, error: "Unauthorized"};
    }

    const greentouchSession = await prisma.greentouchSession.upsert({
      where: { name },
      update: { releaseDate },
      create: { name, releaseDate },
    });

    revalidatePath("/sessions");

    return { success: true, greentouchSession };
  } catch (error) {
    console.error("Error setting release date:", error);
    return { success: false, error: "Failed setting release date" };
  }
}

export async function getAllGreentouchSessions() {
    try {
        const greentouchSessions = await prisma.greentouchSession.findMany({})

        return greentouchSessions;
    } catch (error) {
        console.log("Error fetching greentouch sessions:", error);
        throw new Error("Failed to fetch greentouch sessions");
    }
}

export async function getGreentouchSessionByName(name: string) {
    try {
        const greentouchSession = await prisma.greentouchSession.findUnique({
            where: { name },
        })

        return greentouchSession;
    } catch (error) {
        console.log("Error fetching greentouch session:", error);
        throw new Error("Failed to fetch greentouch session");
    }
}