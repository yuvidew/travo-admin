import React from 'react'
import { CreateTripForm } from './_components/CreateTripForm'
import { SiteHeader } from '@/components/Header'
import { BreadCrumbComp } from '@/components/breadcrumb-comp'

const CreateTripPage = () => {
    return (
        <main className='flex flex-col gap-[10px]'>
            <SiteHeader
                header_name='Create Trips with AI'
            />

            <div className=' flex flex-col gap-[54px] p-6'>
                {/* start to bread crump */}
                <BreadCrumbComp />
                {/* end to bread crump */}

                {/* start to form */}
                <CreateTripForm />
                {/* end to form */}
            </div>
        </main>
    )
}

export default CreateTripPage
