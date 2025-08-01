import React from 'react'
import { SignInForm } from '../_components/sign-in-form'
import { ModeToggle } from '@/components/ModeToggle'

const SignInPage = () => {
    return (
        <main className="bg-background flex min-h-svh relative flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div className=' absolute top-8 right-8'>
                    <ModeToggle/>
                </div>
            <div className="w-full max-w-sm ">
                <SignInForm />
            </div>
        </main>
    )
}

export default SignInPage