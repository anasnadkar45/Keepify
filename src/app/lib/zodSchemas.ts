import { z } from "zod";

export const platformSchema = z.object({
    name: z.
        string()
        .min(3, { message: 'Name has be minimum characters of 3' }),
    description: z.
        string()
        .min(10, { message: 'Description has be minimum characters of 10' }),
    logo: z.
        string()
        .min(1, { message: 'Logo is required' }),
})