"use server";

import { getServerSession } from "@/lib/get-session";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createNewsArticle(title: string, content: string) {
    try {
        const session = await getServerSession();

        if(!session) {
             throw new Error("Unauthenticated");
        }
        
        if(session.user.role !== "admin") {
            throw new Error("Unauthorized");
        }

        const userId = session.user.id;

        const newsArticle = await prisma.newsArticle.create({
            data: {
                title,
                content,
                authorId: userId,
            }
        })

        revalidatePath("/news");
        return {success:true, newsArticle}
    } catch (error) {
        console.error("Error creating news article:", error);
        return {success:false, error: "Failed to create news article"};
    }
}

export async function getAllNewsArticles() {
    try {
        const newsArticles = await prisma.newsArticle.findMany({
            orderBy: { createdAt: 'desc' },
            
        })

        return newsArticles;
    } catch (error) {
        console.log("Error fetching news articles:", error);
        throw new Error("Failed to fetch news articles");
    }
}