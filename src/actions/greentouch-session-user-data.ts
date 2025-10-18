"use server"

import { getServerSession } from "@/lib/get-session";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveUserNatureConnectedness(greentouchSessionId: string, value: number) {
    try {   
        const session = await getServerSession();
        if (!session) throw new Error("User not authenticated");

        const userId = session.user.id;

        const existingData = await prisma.greentouchSessionUserData.findUnique({
            where: { greentouchSessionId_userId: { greentouchSessionId, userId } },
        });

        if (existingData) {
            await prisma.greentouchSessionUserData.update({
                where: { greentouchSessionId_userId: { greentouchSessionId, userId } },
                data: { natureConnectedness: value },
            });
        } else {
            await prisma.greentouchSessionUserData.create({
                data: {
                userId,
                greentouchSessionId,
                natureConnectedness: value
                }
            });
        }

        revalidatePath(`/nature-connectedness/${greentouchSessionId}`);
        return {success:true}
    } catch (error) {
        console.error("Error saving user nature connectedness:", error);
        return {success:false, error: "Failed to save nature connectedness."};
    }
}
