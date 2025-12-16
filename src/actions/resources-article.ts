"use server";

import { getServerSession } from "@/lib/get-session";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createResourcesArticle(topic: string, title: string, content: string, link: string) {
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

        const userId = session.user.id;

        const resourcesArticle = await prisma.resourcesArticle.create({
            data: {
                topic,
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
        console.error("Error fetching resources articles:", error);
        throw new Error("Failed to fetch resources articles");
    }
}

export async function updateResourcesArticle(id: string, topic: string, title: string, content: string, link: string) {
    try {
        const session = await getServerSession();

        if(!session) {
            console.error("User not authenticated");
            return {success:false, error: "User not authenticated"};
        }

        if(session.user.role !== "admin") {
            console.error("Unauthorized access attempt");
            return {success:false, error: "Unauthorized"};
        }

        const resourcesArticle = await prisma.resourcesArticle.findUnique({
            where: { id },
        })

        if (!resourcesArticle) {
            return { success: false, error: "Resources article not found" };
        }

        const updatedArticle = await prisma.resourcesArticle.update({
            where: { id },
            data: { topic, title, content, link },
        })

        revalidatePath("/resources/articles" + id);
        return { success: true, updatedArticle };
    } catch (error) {
        console.error("Error updating resources article:", error);
        return { success: false, error: "Failed to update resources article" };
    }
}

export async function deleteResourcesArticle(resourcesArticleId: string) {
    try {
        const session = await getServerSession();

        if(!session) {
            console.error("User not authenticated");
            return {success:false, error: "User not authenticated"};
        }
        
        if(session.user.role !== "admin") {
            console.error("Unauthorized access attempt");
        }

        const resourcesArticle = await prisma.resourcesArticle.findUnique({
            where: { id: resourcesArticleId },
        })

        if (!resourcesArticle) {
            return { success: false, error: "Resources article not found" };
        }

        await prisma.resourcesArticle.delete({
            where: { id: resourcesArticleId }
        })

        revalidatePath("/resources/articles");
        return { success: true };
    } catch (error) {
        console.error("Error deleting resources article:", error);
        return { success: false, error: "Failed to delete resources article" };
    }
}

export async function getAllResourcesArticlesTopics() {
    try {
        const topics = await prisma.resourcesArticle.findMany({
          distinct: ["topic"],
          select: { topic: true },
          orderBy: { topic: "asc" },
        });
    
        const plain = topics.map((t) => t.topic).filter(Boolean);
        return ({ success: true, topics: plain });
    } catch (err) {
        console.error("GET /api/topics error:", err);
        return { success: false, topics: [] };
    }
}
