import prisma from '@/app/lib/db'
import CreatePlatform from '@/components/forms/platform/CreatePlatform'
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
                    <div key={platform.id} className='bg-card p-3 relative flex flex-col justify-center min-h-[200px] border-2 rounded-b-lg rounded-r-lg'>
                        <div className='w-full flex justify-center'>
                            <Image src={platform.logo} width={150} height={150} alt={platform.name} />
                        </div>
                        <h4 className='font-bold'>{platform.name}</h4>
                        <p className='text-muted-foreground'>Size: 20</p>
                        <div className='absolute bg-card border-t-[14px] border-r-2 border-l-2 w-[60%] h-10 -top-10 -left-[1.5px] rounded-t-2xl'></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage