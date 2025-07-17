import { prisma } from "@/lib/prisma";

export default async function Page() {

const users = await prisma.user.findMany();

    return(
        <div className="text-center pt-12">
            <h1 className="text-4xl font-bold">About GreenTouch</h1>
            <p className="mt-4 text-lg">Learn more about our mission and values.</p>
            <p className="mt-2 text-sm text-gray-500">Join us in making a difference!</p>

        <ul>
            {users.map((user: { id: string; name: string; email: string }) => (
                <li key={user.id} className="mt-2">{user.name} - {user.email}</li>
            ))}
        </ul>
        </div>
    )
}