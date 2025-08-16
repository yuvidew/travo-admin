import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Globe } from "lucide-react"
import { Skeleton } from "./ui/skeleton"
import { cn } from "@/lib/utils"

interface Props {
    header_name : string,
    is_loading? : boolean,
    checkIsPublished? : string
    is_Show_Publish? : boolean
}

export const SiteHeader = ({header_name, checkIsPublished , is_loading , is_Show_Publish = true} : Props) => {
    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4"
                />
                {is_loading ? (
                <>
                    <Skeleton className="w-52 h-6" />
                    <div className="ml-auto flex items-center gap-2">
                        <Skeleton className="h-9 px-4 py-2 has-[>svg]:px-3"/>
                    </div>
                </>
                ) : (
                <>
                    <h1 className="text-base font-medium">{header_name}</h1>
                    <div className={cn("ml-auto items-center gap-2" , is_Show_Publish ? "flex" : "hidden")}>
                        <Button variant='default' size="sm">
                            <Globe />
                            {checkIsPublished === "1" ? "Published" : "Publish"}
                        </Button>
                    </div>
                </>
                )}
            </div>
        </header>
    )
}
