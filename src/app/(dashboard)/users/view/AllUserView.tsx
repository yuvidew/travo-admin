"use client";

import React, { useMemo, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Payment } from '@/types/type'
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

const select_status = [
    "Pending", "Processing", "Success", "Failed"
]

const payments: Payment[] = [
    {
        id: 1,
        amount: 100,
        user_name: "Neha Kapoor",
        status: "pending",
        email: "neha@example.com",
        booked_trips: 2,
    },
    {
        id: 2,
        amount: 125,
        user_name: "Vibha",
        status: "processing",
        email: "vibha@gmail.com",
        booked_trips: 1,
    },
    {
        id: 3,
        amount: 250,
        user_name: "Rahul Mehta",
        status: "success",
        email: "rahul.mehta@example.com",
        booked_trips: 3,
    },
    {
        id: 4,
        amount: 80,
        user_name: "Priya Sharma",
        status: "failed",
        email: "priya.sharma@example.com",
        booked_trips: 0,
    },
    {
        id: 5,
        amount: 300,
        user_name: "Arjun Verma",
        status: "success",
        email: "arjun.verma@example.com",
        booked_trips: 4,
    },
    {
        id: 6,
        amount: 150,
        user_name: "Simran Kaur",
        status: "processing",
        email: "simran.kaur@example.com",
        booked_trips: 2,
    },
    {
        id: 7,
        amount: 200,
        user_name: "Karan Singh",
        status: "pending",
        email: "karan.singh@example.com",
        booked_trips: 1,
    },
    {
        id: 8,
        amount: 95,
        user_name: "Anjali Nair",
        status: "failed",
        email: "anjali.nair@example.com",
        booked_trips: 0,
    },
    {
        id: 9,
        amount: 400,
        user_name: "Rohit Gupta",
        status: "success",
        email: "rohit.gupta@example.com",
        booked_trips: 6,
    },
    {
        id: 10,
        amount: 180,
        user_name: "Sneha Iyer",
        status: "pending",
        email: "sneha.iyer@example.com",
        booked_trips: 2,
    },
    {
        id: 11,
        amount: 275,
        user_name: "Manish Tiwari",
        status: "processing",
        email: "manish.tiwari@example.com",
        booked_trips: 3,
    },
    {
        id: 12,
        amount: 320,
        user_name: "Ritika Bansal",
        status: "success",
        email: "ritika.bansal@example.com",
        booked_trips: 5,
    },
    {
        id: 13,
        amount: 145,
        user_name: "Amit Joshi",
        status: "failed",
        email: "amit.joshi@example.com",
        booked_trips: 1,
    },
    {
        id: 14,
        amount: 220,
        user_name: "Divya Malhotra",
        status: "pending",
        email: "divya.malhotra@example.com",
        booked_trips: 2,
    },
    {
        id: 15,
        amount: 360,
        user_name: "Siddharth Rao",
        status: "success",
        email: "siddharth.rao@example.com",
        booked_trips: 7,
    },
    {
        id: 16,
        amount: 175,
        user_name: "Pooja Sethi",
        status: "processing",
        email: "pooja.sethi@example.com",
        booked_trips: 2,
    },
    {
        id: 17,
        amount: 280,
        user_name: "Nikhil Jain",
        status: "success",
        email: "nikhil.jain@example.com",
        booked_trips: 4,
    },
    {
        id: 18,
        amount: 90,
        user_name: "Shreya Das",
        status: "failed",
        email: "shreya.das@example.com",
        booked_trips: 0,
    },
    {
        id: 19,
        amount: 240,
        user_name: "Akash Patel",
        status: "pending",
        email: "akash.patel@example.com",
        booked_trips: 3,
    },
    {
        id: 20,
        amount: 310,
        user_name: "Meera Reddy",
        status: "success",
        email: "meera.reddy@example.com",
        booked_trips: 5,
    },
];


export const AllUserView = () => {
    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue] = useLocalStorage("user-search", "")
    const itemsPerPage = 10;

    

    const filteredUsers = useMemo(() => {
        return payments.filter(({ user_name, email }) =>
            user_name.toLowerCase().includes(searchValue.toLowerCase())
            ||
            email.toLowerCase().includes(searchValue.toLowerCase())
        )
    }, [ searchValue])

    const filteredByStatus = useMemo(() => {
        return filteredUsers.filter(({status}) => {
            if (filter === "all") {
                return true
            }
            return status.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
        })
    } , [filter, filteredUsers])

    const paginateUser = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredByStatus.slice(startIndex, endIndex)
    }, [currentPage, filteredByStatus, itemsPerPage]);

    const totalPages = useMemo(() => {
        return Math.ceil(filteredByStatus.length / itemsPerPage);
    }, [filteredByStatus.length, itemsPerPage]);

    const columns: ColumnDef<Payment>[] = [
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
            accessorKey: "email",
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
            <DataTable
                data={paginateUser}
                columns={columns}
            />

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
