"use client"
import { useGetTripById } from '@/app/(dashboard)/create-trips/hook/useTripApi';
import { SiteHeader } from '@/components/Header';
import React, { useEffect } from 'react'
import { TripImages, TripImagesSkeleton } from '../_components/TripImages';

interface Props {
    id: string
}

/**
 * Displays the details of a specific trip by fetching trip data from the API.
 * 
 * - Fetches trip data when the `id` changes.
 * - Shows a loading header and image skeletons while fetching.
 * - Renders trip images once data is loaded.
 *
 * @param {Object} props - Component props.
 * @param {string} props.id - The unique trip ID to fetch and display.
 *
 * @example
 * ```tsx
 * <TripDetailsView id="12345" />
 * ```
 */

export const TripDetailsView = ({ id }: Props) => {
    const { loading, trip, onGetTripById, tripResult } = useGetTripById();

    useEffect(() => {
        if (id) {
            onGetTripById(id);
        }
    }, [id]);


    return (
        <main className='flex flex-col gap-[10px]'>
            <SiteHeader
                header_name={loading ? 'Loading...' : tripResult?.name as string}
                is_loading={loading}
                checkIsPublished={trip?.is_published}
            />
            <div className=" flex  flex-col items-center justify-start p-6 md:p-10">
                {(loading && trip === null) ? (
                    <section className="w-full max-w-sm md:max-w-3xl">
                        <TripImagesSkeleton />
                    </section>
                ) : (
                    <section className="w-full max-w-sm md:max-w-3xl">
                        <TripImages
                            images={Array.isArray(trip?.images)
                                ? trip!.images
                                : (trip?.images?.split(",") ?? [])
                            }
                        />
                    </section>
                )}
            </div>
        </main>
    )
}
