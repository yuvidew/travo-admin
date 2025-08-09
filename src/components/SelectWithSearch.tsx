"use client";

import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Spinner from "./Spinner";
import Image from "next/image";

interface Props {
    placeholder: string;
    value: string;
    onChangeValue: (value: string) => void;
    List: {
        label: string;
        value: string;
        img?: string;
    }[];
    loading?: boolean;
}

export const SelectWithSearch = ({
    placeholder,
    value,
    onChangeValue,
    List,
    loading
}: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className=" justify-between text-muted-foreground"
                >
                    {value
                        ? List.find((item) => item.value === value)?.label
                        : `Select ${placeholder}...`}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0">
                <Command>
                    <CommandInput
                        placeholder={`Search ${placeholder}...`}
                        className="h-9"
                    />
                    <CommandList>
                        <CommandEmpty >No {placeholder} found.</CommandEmpty>
                        <CommandGroup>
                            {loading ? (
                                <Spinner color="default"  />
                            ) : List.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value}
                                    onSelect={(currentValue) => {
                                        onChangeValue(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    {item.img && (
                                        <Image 
                                            src={item.img} 
                                            alt={item.label} 
                                            width={50}
                                            height={50}
                                            className=" size-5"
                                        />
                                    )}
                                    {item.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === item.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
