import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import Spinner from '@/components/Spinner';
import Image from 'next/image';

interface Props {
    onComplete: () => void
}


const forgetPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
})

export const EmailSendForm = ({ onComplete }: Props) => {
    const form = useForm<z.infer<typeof forgetPasswordSchema>>({
        resolver: zodResolver(forgetPasswordSchema),
        defaultValues: {
            email: "",
        }
    });

    const onSubmit = (values: z.infer<typeof forgetPasswordSchema>) => {
        console.log("forget password ", values);

        onComplete()
    }

    return (
        <>
            {/* start to logo and description  */}
            <div className="flex flex-col items-start gap-2">
                <a href="#" className="flex flex-col items-center gap-2 font-medium">
                    <div className="flex size-8 items-center justify-center rounded-md">
                        <Image src={"/logo.png"} alt="Travo" width={35} height={35} />
                    </div>
                    <span className="sr-only ">Travo.</span>
                </a>

                {/* start to heading */}
                <h3 className=" text-2xl font-semibold text-primary">
                    Forget password?
                </h3>
                {/* end to heading */}

                {/* start to description */}
                <p className=" text-sm text-muted-foreground">
                    No worries, we&apos;ll send you reset instruction
                </p>
                {/* end to description */}
            </div>
            {/* end to logo and description  */}
            <Form {...form}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit(onSubmit)()
                    }}

                    className=' flex flex-col gap-6'
                >
                    <div className=' grid gap-3'>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            value={field.value}
                                            onChange={field.onChange}
                                            required
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        // disabled={loading}
                        className="w-full cursor-pointer"
                    >
                        {false ? <Spinner size="sm" /> : "Submit"}
                    </Button>
                </form>
            </Form>
        </>
    )
}
