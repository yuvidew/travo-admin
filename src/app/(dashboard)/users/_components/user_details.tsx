"use client "
import React, { ReactNode, useEffect } from 'react';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { TripList } from '@/types/type';
import { useGetBookedTripsByIds } from '../hook/useGetBookedTripsByIds';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
    children : ReactNode,
    id : number,
    user_info : TripList
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
    const {mutate , isPending , isError} = useGetBookedTripsByIds()

    console.log("the asd");
    useEffect(() => {
        mutate(user_info.trips)
    } , []);


    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    {isError ? (
                        <div className=' flex flex-col gap-2'>
                            <SheetTitle>
                                Failed to fetch data
                            </SheetTitle>
                        </div>
                    ) : isPending ? (
                        <div className=' flex flex-col gap-2'>
                            {[1, 2, 3, 4].map((item) => (
                                <Skeleton key={item} className=' h-12 w-full' />
                            ))}
                        </div>
                    ) : (
                    <div className='flex flex-col gap-0'>
                        <SheetTitle>
                            {user_info.user_name} {" "}
                            {id}
                        </SheetTitle>
                        <SheetDescription>
                            {user_info.user_email}
                        </SheetDescription>
                    </div>

                    )}
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}
