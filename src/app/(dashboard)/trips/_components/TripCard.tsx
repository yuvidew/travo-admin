import React from 'react';
import {
    Card,
    CardFooter,
} from "@/components/ui/card"
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, SquareArrowOutUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InfoPills } from '../[id]/_components/InfoPills';
import { TripItineraryDay } from '@/types/type';

interface Props {
    img: string,
    is_publish: boolean,
    title: string,
    duration: number,
    itinerary: TripItineraryDay[],
    onViewMore : () => void
}

/**
 * TripCard component - displays a trip preview with image, title, duration, and itinerary details.
 *
 * @param {string} img - The trip image URL.
 * @param {boolean} is_publish - Indicates whether the trip is published.
 * @param {string} title - The title of the trip.
 * @param {number} duration - The number of days of the trip.
 * @param {TripItineraryDay[]} itinerary - The itinerary details of the trip (locations per day).
 * @param {() => void} onViewMore - Callback function triggered when the "View more" button is clicked.
 *
 * @example
 * <TripCard
 *   img="/images/trip1.jpg"
 *   is_publish={true}
 *   title="Himalayan Adventure"
 *   duration={7}
 *   itinerary={[{ day: 1, location: "Manali" }, { day: 2, location: "Leh" }]}
 *   onViewMore={() => console.log("View more clicked")}
 * />
 */

export const TripCard = ({img , is_publish , title , duration , itinerary , onViewMore} : Props) => {
    return (
        <Card className='p-0 overflow-hidden gap-3'>
            <div className=' w-full h-80 relative'>
                <Image
                    src={img}
                    alt='image'
                    width={500}
                    height={500}
                    className=' h-full w-full object-cover'
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className=' absolute top-0 left-0 h-full flex justify-between flex-col p-6 '>
                    <div>

                        {is_publish ? <Badge>
                            is publish
                        </Badge> : null}
                    </div>

                    <h4 className=' text-[16px] text-white'>
                        {title}
                    </h4>
                </div>
            </div>
            <CardFooter className=' py-2 w-full pb-3'>
                <div className=' h-full flex flex-col gap-4 w-full '>
                    <div className=' flex items-center justify-between gap-4'>
                        <InfoPills
                            text={`${duration ?? 0} day plan`}
                            Icon={Calendar}
                        />
                        <InfoPills
                            text={
                                itinerary
                                    ?.slice(0, 2)
                                    .map((day) => day.location)
                                    .join(", ") || "Unknown Location"
                            }
                            Icon={MapPin}
                        />
                    </div>

                    <Button className=' w-full' onClick={onViewMore}>
                        View more  <SquareArrowOutUpRight className=' size-5' />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
