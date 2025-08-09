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
    /**
     * The placeholder text displayed when no value is selected.
     */
    placeholder: string;

    /**
     * The currently selected value.
     */
    value: string;

    /**
     * Callback fired when the selected value changes.
     * @param value - The new selected value.
     */
    onChangeValue: (value: string) => void;

    /**
     * The list of selectable options.
     * Each option must have a `label` (display text) and `value` (internal value),
     * and can optionally have an `img` URL to display alongside.
     */
    List: {
        label: string;
        value: string;
        img?: string;
    }[];

    /**
     * Optional loading state.
     * When true, a spinner will be shown instead of the list.
     */
    loading?: boolean;
}

/**
 * A searchable dropdown select component with optional images and loading state.
 *
 * @param {string} placeholder - Text shown when no option is selected and in the search input.
 * @param {string} value - The currently selected value.
 * @param {(value: string) => void} onChangeValue - Callback fired when a new option is selected.
 * @param {{label: string; value: string; img?: string}[]} List - Array of options to display.
 * @param {boolean} [loading] - Optional loading state to display a spinner instead of options.
 *
 * @example
 * const [selected, setSelected] = useState("");
 * 
 * <SelectWithSearch
 *   placeholder="Activity"
 *   value={selected}
 *   onChangeValue={setSelected}
 *   List={[
 *     { label: "Football", value: "football", img: "/images/football.png" },
 *     { label: "Basketball", value: "basketball" },
 *   ]}
 *   loading={false}
 * />
 */

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
