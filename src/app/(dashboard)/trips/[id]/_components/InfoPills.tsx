import { LucideIcon } from "lucide-react";
import React from "react";

/**
 * Props for the InfoPills component.
 */
interface InfoPillsProps {
    /** The label or description to display next to the icon. */
    text: string;
    /** The Lucide icon component to render. */
    Icon: LucideIcon;
}

/**
 * A small pill-style UI component that displays a Lucide icon next to text.
 *
 * @param {string} text - The label or description to display next to the icon.
 * @param {LucideIcon} Icon - The Lucide icon component to render.
 *
 * @example
 * ```tsx
 * import { InfoPills } from "./InfoPills";
 * import { MapPin } from "lucide-react";
 *
 * <InfoPills text="New York" Icon={MapPin} />
 * ```
 */
export const InfoPills: React.FC<InfoPillsProps> = ({ text, Icon }) => {
    return (
        <div className="flex items-center gap-[6px]">
            <Icon className="size-[20px]" />
            <p className="text-[#7F7E83] font-normal text-[18px]">{text}</p>
        </div>
    );
};
