import React from 'react'
import { Card, CardContent } from './ui/card'
import { TriangleAlert } from 'lucide-react'

interface Props {
    /** The main action or process that failed (e.g. "Fetch trip") */
    heading: string;
    /** A more detailed explanation of the error */
    description: string;
}

/**
 * Displays a styled error message card.
 *
 * @param {Props} props
 * @param {string} props.heading - The main action or process that failed.
 * @param {string} props.description - A more detailed explanation of the error.
 */

export const ErrorView = ({heading , description} : Props) => {
    return (
        <div className=' w-full h-[80%] flex items-center justify-center'>
            <Card>
                <CardContent className=' flex flex-col items-center justify-center gap-4'>
                    <TriangleAlert className=' size-9 text-red-600' />
                    <h1 className=' text-2xl font-bold'>
                        Failed to {heading}
                    </h1>
                    <p className=' text-muted-foreground'>
                        {description}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
