import React, { ReactNode } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from './ui/separator';
import { ModeToggle } from './ModeToggle';

export const SettingModal = ({children} : {children : ReactNode}) => {
    return (
        <Dialog>
            <DialogTrigger className='flex items-center gap-2 w-full' asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>My settings</DialogTitle>
                </DialogHeader>
                <Separator/>

                <div className=' flex items-center justify-between'>
                    <div className=' flex flex-col gap-1'>
                        <h3>Appearance</h3>
                        <p className=' text-muted-foreground text-xs'>Customize how Travo looks on your device</p>
                    </div>
                    <ModeToggle/>
                </div>
            </DialogContent>
        </Dialog>
    )
}
