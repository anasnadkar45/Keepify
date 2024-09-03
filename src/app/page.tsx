import React from 'react'
import Navbar from '../components/landing page/Navbar'
import { unstable_noStore } from 'next/cache';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

const page = async () => {
  unstable_noStore();
  const { isAuthenticated } = getKindeServerSession();
  if (await isAuthenticated()) {
    return redirect("/home");
  }
  
  return (
    <div>
      <Navbar />
    </div>
  )
}

export default page