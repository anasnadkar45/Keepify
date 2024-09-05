"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "./lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { parseWithZod } from '@conform-to/zod'
import { platformSchema } from "./lib/zodSchemas";


// ------------------------------------------------------------------------------



export async function AddPlatform(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession()
    const user = await getUser();

    if (!user) {
        redirect('/api/auth/login')
    }

    const submission = parseWithZod(formData, {
        schema: platformSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }


    try {
        const data = await prisma.platform.create({
            data: {
                name: submission.value.name,
                description: submission.value.description,
                logo: submission.value.logo,
                userId:user.id,
            }
        });

        revalidatePath('/home');

    } catch (err) {
        console.error("Error creating project:", err);
    }
}