import prisma from '@/app/lib/db'
import CreatePlatform from '@/components/forms/platform/CreatePlatform'
import PlatformCard from '@/components/global/Home/PlatformCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Youtube } from 'lucide-react'
import Image from 'next/image'
import { platform } from 'os'

async function getPlatforms(userId: string) {
    const data = await prisma.platform.findMany({
        where: {
            userId: userId,
        },
        select: {
            id: true,
            name: true,
            description: true,
            logo: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return data;
}

const HomePage = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const userId = user.id as string;
    const platforms = await getPlatforms(userId)
    return (
        <div className='p-2'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold '>Platforms</h2>

                <CreatePlatform />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 gap-y-12 pt-10'>
                {platforms.map((platform) => (
                    <PlatformCard key={platform.id} platform={platform}/>
                ))}
            </div>
        </div>
    )
}

export default HomePage