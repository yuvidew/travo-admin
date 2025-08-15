"use client";
import { SiteHeader } from "@/components/Header";
import React, { useEffect, useMemo } from "react";
import { TripImages, TripImagesSkeleton } from "../_components/TripImages";
import { Skeleton } from "@/components/ui/skeleton";
import { InfoPills } from "../_components/InfoPills";
import { Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useGetTripById } from "@/app/(dashboard)/create-trips/hook/useTripApi";

interface Props {
    id: string;
}

/**
 * Displays details of a trip fetched by its ID.
 */
export const TripDetailsView = ({ id }: Props) => {
    const { loading, trip, onGetTripById, tripResult } = useGetTripById();

    useEffect(() => {
        if (id) onGetTripById(id);
    }, [id]);

    const pillsItems = useMemo(
        () =>
            tripResult
                ? [
                    {
                        text: tripResult.travelStyle ?? "",
                        classname: "bg-[#F7EDF6] text-[#C11574]",
                    },
                    {
                        text: tripResult.groupType ?? "",
                        classname: "bg-[#E9F3FB] text-[#175CD3]",
                    },
                    {
                        text: tripResult.budget ?? "",
                        classname: "bg-[#ECFDF3] text-[#027A48]",
                    },
                    {
                        text: tripResult.interests ?? "",
                        classname: "bg-[#F0F9FF] text-[#026AA2]",
                    },
                ]
                : [],
        [tripResult]
    );

    const visitTimeAndWeather = useMemo(() =>
        tripResult
            ? [
                {
                    text: "Best Time to Visit",
                    items: tripResult?.bestTimeToVisit || [],
                },
                {
                    text: "Weather",
                    items: tripResult?.weatherInfo || [],
                },
            ]
            :
            []
        , [tripResult])

    const tripImages = useMemo(() => {
        if (!trip?.images) return [];
        return Array.isArray(trip.images) ? trip.images : trip.images.split(",");
    }, [trip?.images]);

    if (loading) {
        return (
            <main className="flex flex-col gap-[10px]">
                <SiteHeader header_name="Loading..." is_loading />
                <section className="w-full max-w-sm md:max-w-3xl flex flex-col gap-5.5">
                    <Skeleton className="w-full h-4" />
                    <TripImagesSkeleton />
                    <Skeleton className="w-full h-96" />
                </section>
            </main>
        );
    }

    return (
        <main className="flex flex-col gap-[10px]">
            {/* start to header */}
            <SiteHeader
                header_name={tripResult?.name ?? ""}
                is_loading={loading}
                checkIsPublished={trip?.is_published}
            />
            {/* end to header */}
            <div className="flex flex-col items-center p-6 md:p-10">
                <section className="w-full max-w-sm md:max-w-3xl flex flex-col gap-5.5">
                    {/* start Trip Heading */}
                    <div className="flex flex-col gap-[24px]">
                        <h3 className="font-semibold text-[40px]">
                            {tripResult?.name ?? ""}
                        </h3>
                        <div className="flex items-center gap-[25px]">
                            <InfoPills
                                text={`${tripResult?.duration ?? 0} day plan`}
                                Icon={Calendar}
                            />
                            <InfoPills
                                text={
                                    ((tripResult?.itinerary?.slice(0, 2) ?? [])
                                        .map((day) => day.location)
                                        .join(", ")) || "Unknown Location"
                                }
                                Icon={MapPin}
                            />
                        </div>
                    </div>
                    {/* end Trip Heading */}

                    {/* start Trip Images */}
                    <TripImages images={tripImages} />
                    {/* end Trip Images */}

                    {/* start Pills + Ratings */}
                    <div className="flex items-center gap-[20px]">
                        {pillsItems.map((item, index) => (
                            <Badge
                                key={index}
                                className={cn(
                                    "py-1 px-3 rounded-full font-semibold",
                                    item.classname
                                )}
                            >
                                {item.text}
                            </Badge>
                        ))}

                        <ul className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <li key={index}>
                                    <Image
                                        src="/assets/icons/star.svg"
                                        width={20}
                                        height={20}
                                        alt="star icon"
                                        className="size-[12px]"
                                    />
                                </li>
                            ))}
                        </ul>
                        <Badge className="py-1 px-3 rounded-full font-semibold bg-[#FFF4ED] text-[#B93815]">
                            4.8/5.0
                        </Badge>
                    </div>
                    {/* end Pills + Ratings */}

                    {/* start article heading */}
                    <div className="flex items-start justify-between">
                        <div className=" flex flex-col gap-[16px]">
                            <h2 className="  font-semibold text-[30px]">
                                {tripResult?.duration}-Day {tripResult?.country}{" "}
                                {tripResult?.travelStyle} Trip
                            </h2>
                            <p className="text-muted-foreground font-normal text-[24px]">
                                {tripResult?.budget}, {tripResult?.groupType}, and{" "}
                                {tripResult?.interests}
                            </p>
                        </div>

                        <h3 className=" font-semibold text-[20px]">
                            {tripResult?.estimatedPrice}
                        </h3>
                    </div>
                    {/* end article heading */}

                    {/* start to description */}
                    <p className=" font-normal text-[18px]">
                        {tripResult?.description}
                    </p>
                    {/* end to description */}

                    {/* start itinerary */}
                    <div className="flex flex-col gap-[20px]">
                        {tripResult?.itinerary?.map((day, index) => (
                            <div key={index} className="flex flex-col gap-[30px]">
                                <h3 className="  font-semibold text-[20px]">
                                    Day {day.day}: {day.location}
                                </h3>

                                <ul className="list-disc space-y-[10px] pl-5 text-muted-foreground font-normal ">
                                    {day.activities.map(
                                        ({ time, description }, activityIndex) => (
                                            <li key={activityIndex}>
                                                <span className="text-[15px] font-semibold">
                                                    {time}
                                                </span>
                                                <p className="text-[18px] ">
                                                    {description}
                                                </p>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>
                    {/* end itinerary */}

                    {/* start visit time and weather */}
                    {visitTimeAndWeather &&
                        visitTimeAndWeather.map((item, index) => (
                            <section key={index} className="flex flex-col gap-[20px]">
                                <h3 className="  font-semibold text-[20px]">
                                    {item.text}
                                </h3>
                                <ul className=" flex flex-col gap-[18px]">
                                    {item.items.map((subItem, subIndex) => (
                                        <li
                                            key={subIndex}
                                            className=" font-normal text-[18px]"
                                        >
                                            {subItem}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                    {/* end visit time and weather */}

                    {/* start booking button */}
                    <Button disabled>
                        Pay and join trip
                        <Badge className="py-1 px-3 rounded-full font-semibold cursor-pointer  ">
                            {tripResult?.estimatedPrice || "₹0"}
                        </Badge>
                    </Button>
                    {/* end booking button */}
                </section>
            </div>
        </main>
    );
};
