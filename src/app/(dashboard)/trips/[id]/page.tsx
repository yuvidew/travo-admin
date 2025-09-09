

import React from 'react'
import { TripDetailsView } from './view/TripDetailsView';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/get-query-client';
import { onGetTripById } from '../api-function';

const TripDetailsPage = async({ params }: { params: { id: string } }) => {
    const { id } = params;
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey : ["get-trips-by-id" , id],
        queryFn : () => onGetTripById(id,)
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)} >
            <TripDetailsView id = {id}  />
        </HydrationBoundary>
    );
}

export default TripDetailsPage