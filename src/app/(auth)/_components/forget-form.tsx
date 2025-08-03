import Image from 'next/image'
// import Link from 'next/link'
import React from 'react';

// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import { z } from 'zod';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';

// const VerifyEmail = z.object({
//     email: z.string().email("Invalid email address"),
// })

export const ForgetForm = () => {
//     const form = useForm<z.infer<typeof VerifyEmail>>({
//         resolver : zodResolver(VerifyEmail),
//         defaultValues : {
//             email : ""
//         }
//     });

    // TODO: implement forget password form ui 
    return (
        <div className={"flex flex-col gap-6"}>
            <div className=' flex flex-col gap-6'>
                {/* start to logo  */}
                <div className="flex flex-col items-start gap-4">
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
                    <h3 className=' text-2xl font-bold'>
                        Forget password{" "}?
                    </h3>

                    <p className=' text-sm'>
                        No worries, we'll send you reset instructions.
                    </p>
                </div>
                {/* end to logo  */}

                {/* start to forget password from */}
                {/*  */}
            </div>
        </div>
    )
}
