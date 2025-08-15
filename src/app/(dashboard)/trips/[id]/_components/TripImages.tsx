import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import React from 'react'
import { ImageDialogCarousel } from './ImageDialogCarousel'


interface Props {
    images: string[]
}

/**
 * Renders a responsive grid of trip images with a main large image, 
 * two smaller images, and a "+X" overlay that opens a carousel when clicked.
 *
 * - The first image spans two rows and two columns.
 * - The second image is displayed in a smaller grid cell.
 * - The third image cell shows an overlay with the count of remaining images,
 *   and clicking it opens an image carousel.
 *
 * @param {Object} props - Component props.
 * @param {string[]} props.images - Array of image URLs for the trip.
 *
 * @example
 * ```tsx
 * <TripImages images={[
 *   "https://example.com/img1.jpg",
 *   "https://example.com/img2.jpg",
 *   "https://example.com/img3.jpg",
 *   "https://example.com/img4.jpg"
 * ]} />
 * ```
 */


export const TripImages = ({ images }: Props) => {
    const safeImages = images.filter(Boolean);
    const image_length = safeImages.length - 3;

    return (
        <div className=' grid grid-cols-3 gap-3.5'>
            {safeImages[0] && (
                <Image
                    src={safeImages[0]}
                    alt={`Trip image 0`}
                    className='row-span-2 col-span-2 w-full rounded-md object-cover'
                    width={500}
                    height={500}
                />
            )}
            {safeImages[1] && (
                <Image
                    src={safeImages[1]}
                    alt={`Trip image 1`}
                    className='w-full h-40 rounded-md object-cover'
                    width={500}
                    height={500}
                />
            )}
            {safeImages[2] && (
                <ImageDialogCarousel
                    images={safeImages}
                >
                    <div className=' w-full h-40 rounded-md relative cursor-pointer'>
                        <div className=' absolute z-10 top-0 left-0 h-full w-full bg-black/70 flex items-center justify-center'>
                            <p className=' text-4xl font-bold'>{image_length}+</p>
                        </div>
                        <Image
                            src={safeImages[2]}
                            alt={`Trip image 2`}
                            className='w-full h-full rounded-md object-cover'
                            width={500}
                            height={500}
                        />
                    </div>
                </ImageDialogCarousel>
            )}
        </div>
    )
}

export const TripImagesSkeleton = () => (
    <div className=' grid grid-cols-3 gap-3.5'>
        <Skeleton className=' row-span-2  col-span-2 w-full ' />
        <Skeleton className='  w-full h-40' />
        <Skeleton className='  w-full h-40' />
    </div>
)
