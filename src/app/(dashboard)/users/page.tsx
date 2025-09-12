import { BreadCrumbComp } from '@/components/breadcrumb-comp'
import { SiteHeader } from '@/components/Header'
import React from 'react'
import { AllUserView } from './view/AllUserView'
import { getQueryClient } from '@/lib/get-query-client'
import { onGetBookedTrips } from './api-function'

const BookedUserPage = async () => {
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey : ["get-booked-trips"],
        queryFn : () => onGetBookedTrips()
    });

    return (
        <main className='flex flex-col gap-[10px]'>
            {/* start to header */}
            <SiteHeader
                header_name='Users'
                is_Show_Publish={false}
            />
            {/* end to header */}

            {/* start to table and bread_crumb */}
            <div className=' flex flex-col gap-[54px] p-6'>
                {/* start to bread comp */}
                <BreadCrumbComp />
                {/* end to bread comp */}

                {/* start to view  */}
                <AllUserView/>
                {/* end to view  */}
            </div>
            {/* end to table and bread_crumb */}
        </main>
    )
}

export default BookedUserPage;
