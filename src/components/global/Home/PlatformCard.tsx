import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface platformProps {
    platform: {
        id: string;
        name: string;
        logo: string;
        description: string | null;
    }
}

const PlatformCard = ({ platform }: platformProps) => {
    return (
        <Link href={`/home/${platform.id}`}>
            <div key={platform.id} className='bg-card p-3 hover:cursor-pointer relative flex flex-col justify-center min-h-[200px] border-2 rounded-b-lg rounded-r-lg'>
                <div className='w-full flex justify-center'>
                    <Image src={platform.logo} width={150} height={150} alt={platform.name} />
                </div>
                <h4 className='font-bold'>{platform.name}</h4>
                <p className='text-muted-foreground'>Size: 20</p>
                <div className='absolute bg-card border-t-[14px] border-r-2 border-l-2 w-[60%] h-10 -top-10 -left-[1.5px] rounded-t-2xl'></div>
            </div>
        </Link>
    )
}

export default PlatformCard