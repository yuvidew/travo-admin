import React, { ReactNode } from 'react';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Payment } from '@/types/type';

interface Props {
    children : ReactNode,
    id : number,
    user_info : Payment
}

/**
 * UserDetails component renders a sheet (sliding panel) that displays
 * detailed information about a user.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The trigger element that opens the sheet (e.g., a button or icon).
 * @param {number} props.id - The unique user ID used to fetch and display user details.
 */


export const UserDetails = ({children , id , user_info} : Props) => {
    // TODO : Call the API to list a user's booked trips
    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <div className='flex flex-col gap-0'>
                        <SheetTitle>
                            {user_info.user_name} {" "}
                            {id}
                        </SheetTitle>
                        <SheetDescription>
                            {user_info.user_email}
                        </SheetDescription>
                    </div>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}
