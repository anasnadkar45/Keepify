"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from 'zod';

export type State = {
    status: "error" | "success" | undefined;
    errors?: {
        [key: string]: string[];
    };
    message?: string | null;
};

// ------------------------------------------------------------------------------

const platformSchema = z.object({
    name: z.
        string()
        .min(3, { message: 'Name has be minimum characters of 3' }),
    description: z.
        string()
        .min(30, { message: 'Description has be minimum characters of 30' }).optional(),
    logoUrl: z.
        string()
        .min(3, { message: 'Logo has be minimum characters of 3' }),
})

export async function AddPlatform(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession()
    const user = await getUser();

    if (!user) {
        throw new Error('User not found')
    }

    const validateFields = platformSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        logoUrl: formData.get('logoUrl')
    })

    if (!validateFields.success) {
        return {
            status: "error",
            errors: validateFields.error.flatten().fieldErrors,
            message: "Oops, I think there is a mistake with your inputs.",
        };
    }

    try{
        
    }catch(err) {

    }
}