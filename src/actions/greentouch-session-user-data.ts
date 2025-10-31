"use server"

import { getServerSession } from "@/lib/get-session";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCurrentGreentouchSessionUserData(greentouchSessionId: string) {
    const session = await getServerSession();
    if (!session) throw new Error("User not authenticated");

    const userId = session.user.id;

    const userData = await prisma.greentouchSessionUserData.findUnique({
        where: { greentouchSessionId_userId: { greentouchSessionId, userId } },
        include: { greentouchSession: true },
    });

    return userData;
}

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
                data: { natureConnectedness: value, natureConnectednessCreatedAt: new Date() },
            });
        } else {
            await prisma.greentouchSessionUserData.create({
                data: {
                userId,
                    greentouchSessionId,
                    natureConnectedness: value,
                }
            });
        }

        return {success:true}
    } catch (error) {
        console.error("Error saving user nature connectedness:", error);
        return {success:false, error: "Failed to save nature connectedness."};
    }
}

export async function getAllNatureConnectednessInfo() {
    const session = await getServerSession();
    if (!session) throw new Error("User not authenticated");

    const userId = session.user.id;
    const userData = await prisma.greentouchSessionUserData.findMany({
        where: { userId, natureConnectedness: { not: null } },
        select: {
        natureConnectedness: true,
        natureConnectednessCreatedAt: true,
        greentouchSession: { select: { name: true } },
        },
        orderBy: { greentouchSession: { name: 'asc' } },
    });

    return userData.map((data, index) => ({
        id: index,
        greentouchSessionName: data.greentouchSession.name,
        natureConnectednessValue: data.natureConnectedness ?? 0,
        natureConnectednessCreatedAt: data.natureConnectednessCreatedAt,
    }));
}

export async function saveDiaryEntry(greentouchSessionId: string, greentouchSessionName: string, diaryTexts: string[]) {
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
                data: { diaryEntry: diaryTexts },
            });
        } else {
            await prisma.greentouchSessionUserData.create({
                data: {
                    userId,
                    greentouchSessionId,
                    diaryEntry: diaryTexts,
                }
            });
        }

        revalidatePath("/sessions/" + greentouchSessionName);
        return {success:true}
    } catch (error) {
        console.error("Error saving diary entry:", error);
        return {success:false, error: "Failed to save diary entry."};
    }
}

export async function getAllDiaryEntries() {
    const session = await getServerSession();
    if (!session) throw new Error("User not authenticated");

    const userId = session.user.id;

    const userData = await prisma.greentouchSessionUserData.findMany({
        where: { userId, diaryEntry: { isEmpty: false } },
        select: {
            greentouchSessionId: true,
            greentouchSession: { select: { name: true } },
            diaryEntry: true,
        },
        orderBy: { greentouchSession: { name: 'asc' } },
    });

    return userData.map((item) => ({
        greentouchSessionId: item.greentouchSessionId,
        greentouchSessionName: item.greentouchSession.name,
        initialDiaryText: item.diaryEntry,
    }));
}

export async function favoriteSession(greentouchSessionId: string, isFavorite: boolean) {
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
                data: { isFavorite },
            });
        } else {
            await prisma.greentouchSessionUserData.create({
                data: {
                    userId,
                    greentouchSessionId,
                    isFavorite,
                }
            });
        }

        return { success: true };
    } catch (error) {
        console.error("Error favoriting session:", error);
        return { success: false, error: "Failed to favorite session." };
    }
}

export async function getAllFavoriteSessions() {
    const session = await getServerSession();
    if (!session) throw new Error("User not authenticated");

    const userId = session.user.id;

    const favoriteSessions = await prisma.greentouchSession.findMany({
        where: { users: { some: { userId, isFavorite: true } } },
    });

    return favoriteSessions;
}

export async function removeFavoriteSession(greentouchSessionName: string) {
    try {
        const session = await getServerSession();
        if (!session) throw new Error("User not authenticated");
        const userId = session.user.id;
        await prisma.greentouchSessionUserData.updateMany({
            where: { greentouchSession: { name: greentouchSessionName }, userId },
            data: { isFavorite: false },
        });
        revalidatePath("/account/favorites");
        return { success: true };
    } catch (error) {
        console.error("Error removing favorite session:", error);
        return { success: false, error: "Failed to remove favorite session." };
    }
}

export async function saveSurveyData(greentouchSessionId: string, outdoorTasksCount: string, indoorTasksCount: string, physicalHealthResponse: string, mentalHealthResponse: string, friendsFamilyResponse: string, learntSomethingNewResponse: string, closerToNatureResponse: string) {
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
                data: {
                        outdoorTasksCount,
                        indoorTasksCount,
                        physicalHealthResponse,
                        mentalHealthResponse,
                        friendsFamilyResponse,
                        learntSomethingNewResponse,
                        closerToNatureResponse,
                },
            });
        } else {
            await prisma.greentouchSessionUserData.create({
                data: {
                    userId,
                    greentouchSessionId,
                    outdoorTasksCount,
                    indoorTasksCount,
                    physicalHealthResponse,
                    mentalHealthResponse,
                    friendsFamilyResponse,
                    learntSomethingNewResponse,
                    closerToNatureResponse,
                },
            });
        }

        return { success: true };
    } catch (error) {
        console.error("Error saving survey data:", error);
        throw new Error("Failed to save survey data.");
    }
}

export async function sessionIsCompleted(greentouchSessionId: string) {
    try {
        const session = await getServerSession();
        if (!session) throw new Error("User not authenticated");
        const userId = session.user.id;

        const existingData = await prisma.greentouchSessionUserData.findUnique({
            where: { greentouchSessionId_userId: { greentouchSessionId, userId } },
        });

        const sessionRecord = await prisma.greentouchSession.findUnique({
            where: { id: greentouchSessionId },
            select: { name: true },
        });

        if (existingData?.sessionCompleted) {
            throw new Error("Session already completed");
        }

        const sessionName = sessionRecord?.name ?? "";
        const isSession1to6 = /^Session\s*[1-6]$/i.test(sessionName);

        if (isSession1to6) {
            if (
                existingData?.natureConnectedness !== null &&
                existingData?.diaryEntry &&
                existingData?.diaryEntry.length > 0 &&
                existingData?.outdoorTasksCount !== null &&
                existingData?.indoorTasksCount !== null &&
                existingData?.physicalHealthResponse !== null &&
                existingData?.mentalHealthResponse !== null &&
                existingData?.friendsFamilyResponse !== null &&
                existingData?.learntSomethingNewResponse !== null &&
                existingData?.closerToNatureResponse !== null
            ) {
                await prisma.greentouchSessionUserData.update({
                    where: { greentouchSessionId_userId: { greentouchSessionId, userId } },
                    data: {
                        sessionCompleted: true,
                    },
                });
                revalidatePath(`/sessions/`);
                return { success: true };
            } else {
                throw new Error("Cannot complete session. All required data not provided.");
            }
        } else {
            // For other sessions, just require natureConnectedness
            if (existingData?.natureConnectedness !== null) {
                await prisma.greentouchSessionUserData.update({
                    where: { greentouchSessionId_userId: { greentouchSessionId, userId } },
                    data: {
                        sessionCompleted: true,
                    },
                });
                revalidatePath(`/sessions/`);
                return { success: true };
            } else {
                throw new Error("Cannot complete session. User data not found.");
            }
        }
    } catch (error) {
        console.error("Error marking session as completed:", error);
        return { success: false, error: "Failed to mark session as completed. Make sure all required data is provided." };
    }
}

export async function getAllCompletedGreentouchSessions () {
    try {
        const session = await getServerSession();
        if (!session) throw new Error("User not authenticated");
        const userId = session.user.id;

        const completedSessions = await prisma.greentouchSessionUserData.findMany({
            where: { userId, sessionCompleted: true },
            include: { greentouchSession: true },
        });

        return completedSessions;
    } catch (error) {
        console.error("Error fetching completed greentouch sessions:", error);
        throw new Error("Failed to fetch completed greentouch sessions");
    }
}