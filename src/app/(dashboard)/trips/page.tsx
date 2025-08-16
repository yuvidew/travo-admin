import { SiteHeader } from '@/components/Header'
import { getQueryClient } from '@/lib/get-query-client';
import { cookies } from 'next/headers';
import React from 'react'
import { onGetTrips } from './api-function';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { BreadCrumbComp } from '@/components/breadcrumb-comp';
import { AllTripsView } from './view/AllTripsView';

const TripPage = async () => {
    const queryClient = getQueryClient();
    const cookieStore = await cookies(); 
    const token = cookieStore.get("travo-token")?.value;
    const user = cookieStore.get("travo-user")?.value;

    const user_id = JSON.parse(user as string).id

    await queryClient.prefetchQuery({
        queryKey : ["get-trips"],
        queryFn : () => onGetTrips(user_id , token),
        
    })


    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <main className='flex flex-col gap-[10px]'>
                <SiteHeader
                    header_name='Trips'
                    is_Show_Publish = {false}
                />
                <div className=' flex flex-col gap-[54px] p-6'>
                    {/* start to bread comp */}
                    <BreadCrumbComp/>
                    {/* end to bread comp */}

                    {/* start to all trips view */}
                    <AllTripsView
                        user_id={user_id}
                        token={token as string}
                    />
                    {/* end to all trips view */}
                </div>
            </main>
        </HydrationBoundary>
    )
}

export default TripPage
