import React, { ReactNode, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

const tripLocations = [
    {
        value: "paris",
        label: "Paris, France",
    },
    {
        value: "new_york",
        label: "New York, USA",
    },
    {
        value: "tokyo",
        label: "Tokyo, Japan",
    },
    {
        value: "sydney",
        label: "Sydney, Australia",
    },
    {
        value: "rome",
        label: "Rome, Italy",
    },
]


export const SearchModal = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    // TODO: Implement a function which to fetch the trips data from server

    return (
        <Dialog 
            open = {isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogTrigger 
                asChild
                className='flex items-center gap-2 w-full' 
            >
                {children}
            </DialogTrigger>
            <DialogContent className='p-0'>
                {/* start dialog title */}
                    <VisuallyHidden>
                        <DialogTitle>
                        </DialogTitle>
                    </VisuallyHidden>
                {/* end dialog title */}
                <Command className="rounded-lg border shadow-md md:min-w-[450px]">
                    <CommandInput placeholder="Search trips..." />
                    <CommandList>
                        <CommandEmpty className=' text-center py-4 text-muted-foreground text-xs'>
                            No results found.
                        </CommandEmpty>
                        <CommandGroup>
                            {tripLocations.map(({label , value}) => (
                                <CommandItem 
                                    key={value}
                                    onSelect={(currentValue) => {
                                        console.log(currentValue === value ? "" : currentValue);

                                        setIsOpen(false)
                                    }}
                                >
                                    <span>{label}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </DialogContent>
        </Dialog>
    )
}
