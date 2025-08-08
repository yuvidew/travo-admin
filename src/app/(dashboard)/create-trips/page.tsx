import React from 'react'
import { CreateTripForm } from './_components/CreateTripForm'

const CreateTripPage = () => {
    return (
        <main className='p-[24px] flex flex-col gap-[34px]'>
            <div className=' flex flex-col gap-3.5'>
                <h3 className=' text-2xl font-medium'>Create Trips with <span className=' text-primary'>AI</span></h3>
                <p className=' text-muted-foreground'>
                    Plan personalized itineraries instantly using AI-powered recommendations tailored to your interests, budget, and travel dates.
                </p>
            </div>

            {/* start to form */}
            <div className=''>
                <CreateTripForm/>
            </div>
            {/* end to form */}
        </main>
    )
}

export default CreateTripPage
