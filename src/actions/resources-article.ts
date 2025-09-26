"use server";

import { getServerSession } from "@/lib/get-session";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createResourcesArticle(title: string, content: string, link: string) {
    try {
        const session = await getServerSession();

        if(!session) {
            throw new Error("Unauthenticated");
        }
        
        if(session.user.role !== "admin") {
            throw new Error("Unauthorized");
        }

        const userId = session.user.id;

        const resourcesArticle = await prisma.resourcesArticle.create({
            data: {
                title,
                content,
                link,
                authorId: userId,
            }
        })

        revalidatePath("/resources/articles");
        return {success:true, resourcesArticle}
    } catch (error) {
        console.error("Error creating resources article:", error);
        return {success:false, error: "Failed to create resources article"};
    }
}

export async function getAllResourcesArticles() {
    try {
        const resourcesArticles = await prisma.resourcesArticle.findMany({
            orderBy: { createdAt: 'desc' },
            
        })

        return resourcesArticles;
    } catch (error) {
        console.log("Error fetching resources articles:", error);
        throw new Error("Failed to fetch resources articles");
    }
}
