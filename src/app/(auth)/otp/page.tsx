import { ModeToggle } from '@/components/ModeToggle'
import React from 'react'
import { OtpForm } from '../_components/otp-form'

const OTPPage = () => {
    return (
        <main className="bg-background flex min-h-svh relative flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className=' absolute top-8 right-8'>
                <ModeToggle />
            </div>

            <div className="w-full max-w-sm ">
                <OtpForm/>
            </div>
        </main>
    )
}

export default OTPPage
