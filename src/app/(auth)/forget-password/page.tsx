import { ModeToggle } from '@/components/ModeToggle'
import React from 'react'
import { ForgetForm } from '../_components/forget-form';

const ForgetPasswordPage = () => {
    return (
        <main className="bg-background flex min-h-svh relative flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className=' absolute top-8 right-8'>
                <ModeToggle />
            </div>
            <div
                className=' w-full max-w-sm'
            >
                <ForgetForm/>
            </div>
        </main>
    )
}

export default ForgetPasswordPage;
