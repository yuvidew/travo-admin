"use client";

import { SearchInput } from '@/components/search-input'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { onGetTrips } from '../api-function'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorView } from '@/components/Error-view';
import { AxiosError } from 'axios';

interface Props {
    user_id: string,
    token: string,
}

/**
 * AllTripsView component
 *
 * Fetches and displays a list of trips for the given user.
 * Handles loading, error, and success states using React Query.
 *
 * @param {Object} props - Component props
 * @param {string} props.user_id - The ID of the logged-in user whose trips are being fetched.
 * @param {string} props.token - The authentication token used to authorize the API request.
 *
 * @example
 * ```tsx
 * <AllTripsView user_id="1" token="my-jwt-token" />
 * ```
 */

export const AllTripsView = ({ user_id, token }: Props) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["get-trips"],
        queryFn: () => onGetTrips(user_id, token),
        enabled: !!user_id && !!token,
    });

    if (isLoading) {
        return (
            <section className=' flex flex-col gap-4'>
                {/* start to search box */}
                <SearchInput
                    search_type='trip-search'
                    storageKey='trip-search'
                    placeholder='Search trip...'
                />
                {/* end to search box */}

                {/* start to all trips */}
                <div className=' grid grid-cols-4 gap-3'>
                    {Array(5).fill(null).map((_, i) => (
                        <Skeleton
                            key={i}
                            className=' h-80'
                        />
                    ))}
                </div>
                {/* end to all trips */}
            </section>
        )
    }

    if (isError) {
        let description = "An unexpected error occurred while fetching the trip.";

        if (error instanceof AxiosError) {
            description = error.response?.data?.message || description;
        } else if (error instanceof Error) {
            description = error.message;
        }

        return (
            <ErrorView
                heading="Fetch trip"
                description={description}
            />
        );
    }

    return (
        <section className=' flex flex-col gap-4'>
            {/* start to search box */}
            <SearchInput
                search_type='trip-search'
                storageKey='trip-search'
                placeholder='Search trip...'
            />
            {/* end to search box */}

            
        </section>
    )
}
