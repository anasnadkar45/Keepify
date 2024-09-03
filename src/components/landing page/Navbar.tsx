import { Button } from '@/components/ui/button'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import React from 'react'
import { UserNav } from './UserNav'

const Navbar = async() => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    return (
        <div className='w-full h-14 bg-muted/80 flex justify-between items-center border-b-2 px-4'>
            <h1>Keepify</h1>
            {!user ? (
                <Button size={"sm"} asChild>
                    <LoginLink>Sign in</LoginLink>
                </Button>
            ) : (
                <UserNav
                    email={user.email as string}
                    name={user.given_name as string}
                    userImage={
                        user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
                    }
                />
            )}
        </div>
    )
}

export default Navbar