import React from 'react'
import { ModeToggle } from '@/components/ModeToggle'
import { SignUpForm } from '../_components/sign-up-form'

const SignInPage = () => {
    return (
        <div className="bg-background flex min-h-svh relative flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div className=' absolute top-8 right-8'>
                    <ModeToggle/>
                </div>
            <div className="w-full max-w-sm ">
                <SignUpForm/>
            </div>
        </div>
    )
}

export default SignInPage