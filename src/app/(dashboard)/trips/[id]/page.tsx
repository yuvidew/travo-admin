

import React from 'react'
import { TripDetailsView } from './view/TripDetailsView';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/get-query-client';
import { onGetTripById } from '../api-function';
import { cookies } from 'next/headers';

const TripDetailsPage = async({ params }: { params: { id: string } }) => {
    const { id } = params;
    const queryClient = getQueryClient();
    const cookieStore = await cookies(); 
    const token = cookieStore.get("travo-token")?.value;

    await queryClient.prefetchQuery({
        queryKey : ["get-trips-by-id" , id],
        queryFn : () => onGetTripById(id, token),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)} >
            <TripDetailsView id = {id} token= {token as string} />
        </HydrationBoundary>
    );
}

export default TripDetailsPage