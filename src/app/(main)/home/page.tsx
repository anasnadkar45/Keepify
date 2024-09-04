import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Youtube } from 'lucide-react'



const HomePage = () => {
    return (
        <div className='p-2'>
            {/* <Dialog>
                <DialogTrigger asChild>
                    <Button>Open</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <Sheet>
                <SheetTrigger>Open</SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Are you absolutely sure?</SheetTitle>
                        <SheetDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet> */}

            <div className='grid grid-cols-5 gap-3 gap-y-12 pt-10'>
                {Array.from({length:20}).map((_, i) => (
                    <div key={i} className='bg-card p-3 relative flex flex-col justify-center min-h-[200px] border-2 rounded-b-lg rounded-r-lg'>
                        <div className='w-full flex justify-center'>
                            <Youtube size={150} className='text-muted' />
                        </div>
                        <h4 className='font-bold'>Youtube</h4>
                        <p className='text-muted-foreground'>Size: 20</p>
                        <div className='absolute bg-card border-t-[14px] border-r-2 border-l-2 w-[60%] h-10 -top-10 -left-[1.5px] rounded-t-2xl'></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage