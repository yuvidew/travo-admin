"use client";

import React, { useMemo, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { TripList } from '@/types/type'
import { SquareArrowOutUpRight } from 'lucide-react';

import { DataTable } from '../_components/data_table'
import { StatusPills } from '../_components/status_pills'
import { UserDetails } from '../_components/user_details';

import { SearchInput } from '@/components/search-input';

import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useLocalStorage } from 'usehooks-ts';
import { useUserBookedTrips } from '../hook/useBookedTripUsers';
import { ErrorView } from '@/components/Error-view';
import Spinner from '@/components/Spinner';

const select_status = [
    "Pending", "Processing", "Success", "Failed"
]



export const AllUserView = () => {
    const { data, isPending, isError } = useUserBookedTrips();


    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue] = useLocalStorage("user-search", "")
    const itemsPerPage = 10;



    const filteredUsers = useMemo(() => {
        if (!data) {
            return [];
        }

        return data.filter(({ user_name, user_email }) =>
            user_name.toLowerCase().includes(searchValue.toLowerCase())
            ||
            user_email.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [data, searchValue]);

    const filteredByStatus = useMemo(() => {
        if (filter === "all") {
            return filteredUsers;
        }

        const normalizedFilter = filter.toLowerCase();
        return filteredUsers.filter(({ status }) =>
            status.toLowerCase().includes(normalizedFilter)
        );
    }, [filter, filteredUsers]);

    const tableRows = useMemo<TripList[]>(() => {
        const allowedStatus: TripList["status"][] = ["pending", "processing", "success", "failed"];

        return filteredByStatus.map((booking) => {
            const normalizedStatus = booking.status.toLowerCase() as TripList["status"];
            const status = allowedStatus.includes(normalizedStatus) ? normalizedStatus : "pending";

            const row: TripList = {
                id: booking.booking_id,
                price: Number(booking.price) || 0,
                user_name: booking.user_name,
                status,
                user_email: booking.user_email,
                booked_trips: booking.trips?.length ?? 0,
            };

            return row;
        });
    }, [filteredByStatus]);

    const paginateUser = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return tableRows.slice(startIndex, endIndex);
    }, [currentPage, tableRows, itemsPerPage]);

    const totalPages = useMemo(() => {
        const totalItems = tableRows.length;
        return Math.max(1, Math.ceil(totalItems / itemsPerPage));
    }, [tableRows.length, itemsPerPage]);

    const columns: ColumnDef<TripList>[] = [
        {
            accessorKey: "no",
            header: "No.",
            cell: ({ row }) => (currentPage - 1) * itemsPerPage + row.index + 1,
        },
        {
            accessorKey: "user_name",
            header: "User name",
        },
        {
            accessorKey: "user_email",
            header: "Email",
        },
        {
            accessorKey: "booked_trips",
            header: "Booked trips",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <StatusPills status={row.original.status} />
        },
        {
            id: "view",
            header: "View",
            cell: ({ row }) => (
                <UserDetails
                    id={row.original.id}
                    user_info={row.original}
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => console.log("View clicked:", row.original.id)}
                    >
                        <SquareArrowOutUpRight />
                    </Button>
                </UserDetails>
            ),
        }

    ]


    if (isError) {
        return (
            <ErrorView
                heading='Failed to fetch user booking data'
                description="We couldn’t load your booking details at the moment. Please check your internet connection and try again."
            />
        )
    }

    return (
        <div className=' flex flex-col gap-4'>
            {/* start to search and filter (filter by status) */}
            <div className=' flex items-center justify-between'>
                <SearchInput
                    storageKey='user-search'
                    search_type='user'
                    placeholder='Search users...'
                />

                {/* start to filter */}
                <Select
                    value={filter}
                    onValueChange={setFilter}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        {select_status.map((item, i) => (
                            <SelectItem
                                key={i}
                                value={item}
                            >
                                {item}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {/* end to filter */}
            </div>
            {/* end to search and filter (filter by status) */}

            {isPending ? (
                <div className=' w-full h-5 flex items-center justify-center'>
                    <Spinner color="default" />
                </div>
            ) : (

            <DataTable
                data={!paginateUser ? [] : paginateUser}
                columns={columns}
            />
            )}

            {/* start to pagination */}
            <div className=' flex items-center gap-1'>
                <Button size={"sm"} variant={"outline"}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <Button size={"sm"} variant={"outline"}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
            {/* end to pagination */}
        </div>
    )
}
