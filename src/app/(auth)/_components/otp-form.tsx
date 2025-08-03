"use client";

import Image from 'next/image';
import React from 'react';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useSendOtp } from '../hook/useAuth';
import Spinner from '@/components/Spinner';

const formSchema = z.object({
    pin: z.string().min(6, {
        message: "Your code must bg 6-digit."
    })
})

export const OtpForm = () => {
    const {loading , onSendOTP} = useSendOtp()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pin: ""
        }
    });

    const onSubmit = () => {
        console.log("the form" , form);
    }

    return (
        <div className='flex flex-col gap-6'>
            <div className="flex flex-col gap-6">
                {/* start to logo  */}
                <div className="flex flex-col items-start gap-2">
                    <a
                        href="#"
                        className="flex flex-col items-center gap-2 font-medium"
                    >
                        <div className="flex size-8 items-center justify-center rounded-md">
                            <Image
                                src={"/logo.png"}
                                alt="Travo"
                                width={35}
                                height={35}
                            />
                        </div>
                        <span className="sr-only ">Travo.</span>
                    </a>
                </div>
                {/* end to logo  */}

                {/* start to heading and description */}

                <div className=' flex flex-col gap-4'>
                    <h3 className=' text-lg font-semibold'>Verify Your Email Address</h3>
                    <p className=' text-sm text-muted-foreground'>
                        Please enter the 6-digit code we sent to {" "}
                        <span className=' font-medium text-primary'>
                            {!localStorage.getItem("travo-user-email") ?  ""  : localStorage.getItem("travo-user-email")}
                        </span>
                    </p>
                </div>
                {/* end to heading and description */}

                {/* start to otp form */}
                <Form {...form}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSubmit();
                            form.handleSubmit(onSendOTP)();
                        }} 
                        className='w-full space-y-6'
                    >
                        <FormField
                            control={form.control}
                            name="pin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup className=' gap-6 justify-between '>
                                                <InputOTPSlot index={0} className=' rounded-md border' />
                                                <InputOTPSlot index={1} className=' rounded-md border' />
                                                <InputOTPSlot index={2} className=' rounded-md border' />
                                                <InputOTPSlot index={3} className=' rounded-md border' />
                                                <InputOTPSlot index={4} className=' rounded-md border' />
                                                <InputOTPSlot index={5} className=' rounded-md border' />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    <Button 
                        type="submit"
                        className='w-full'
                    >
                        {loading ? <Spinner size="sm" /> : "Submit"}
                    </Button>
                    </form>
                </Form>
                {/* end to otp form */}
            </div>

            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}
