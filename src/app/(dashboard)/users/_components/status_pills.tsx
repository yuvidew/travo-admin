import { Badge } from '@/components/ui/badge'
import { Payment } from '@/types/type'
import React from 'react'


/**
 * Renders a colored badge for a given payment status.
 *
 * @param {Object} props - The component props
 * @param {Payment["status"]} props.status - The current payment status ("pending" | "processing" | "success" | "failed")
 */

export const StatusPills = ({ status }: { status: Payment["status"] }) => {
    return (
        <Badge variant={status} className=' capitalize'>
            {status}
        </Badge>
    )
}
