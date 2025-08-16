"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useRouter, usePathname } from "next/navigation";

interface SearchBoxProps {
    storageKey: string;
    search_type: string;
    placeholder: string;
};

/**
 * SearchInput Component
 *
 * A reusable search input that syncs with both localStorage and the URL query string.
 *
 * @param {string} storageKey - The key used to store/retrieve the search value in localStorage.  
 * @example storageKey="userSearch"
 *
 * @param {string} search_type - The query parameter key that will be reflected in the URL.  
 * @example search_type="name"
 *
 * @param {string} placeholder - The placeholder text displayed in the input box.  
 * @example placeholder="Search users..."
 */

export const SearchInput = ({ storageKey, search_type, placeholder }: SearchBoxProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const [value, setValue] = useLocalStorage<string | number>(storageKey, "");

    useEffect(() => {
        const url = qs.stringifyUrl(
            {
                url: pathname,
                query: {
                    [search_type]: value,
                },
            },
            { skipEmptyString: true, skipNull: true }
        );

        router.replace(url);
    }, [value, pathname, search_type, router]);

    return (
        <div className="w-[22.4rem] relative border rounded-md">
            <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
                value={value}
                className="border-none pl-8 placeholder:text-muted-foreground rounded-[8px] bg-white"
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};
