import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode } from "react"

import { Card } from "@/components/ui/card"
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";

interface Props {
    children: ReactNode,
    images: string[]
}

/**
 * Displays a clickable trigger that opens a dialog containing a carousel of images.
 *
 * @param {Object} props - Component properties.
 * @param {ReactNode} props.children - The element that will trigger the dialog when clicked.
 * @param {string[]} props.images - An array of image URLs to display in the carousel.
 *
 * @example
 * ```tsx
 * <ImageDialogCarousel images={[
 *   "https://example.com/image1.jpg",
 *   "https://example.com/image2.jpg"
 * ]}>
 *   <button>View Images</button>
 * </ImageDialogCarousel>
 * ```
 */

export const ImageDialogCarousel = ({ children, images }: Props) => {
    return (
        <Dialog>
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent className="p-0">
                <VisuallyHidden>
                    <DialogTitle>Trip Images</DialogTitle>
                </VisuallyHidden>
                <Carousel className="w-full">
                    <CarouselContent >
                        {images.map((src, index) => (
                            <CarouselItem key={index}>
                                <Card className="rounded-md overflow-hidden p-0">
                                    <Image
                                        src={src}
                                        alt={`Trip image ${index + 1}`}
                                        width={800}
                                        height={800}
                                        className="object-cover w-full h-[450px]"
                                    />
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </DialogContent>
        </Dialog>
    )
}