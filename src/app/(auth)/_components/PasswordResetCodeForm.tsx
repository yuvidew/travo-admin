import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';


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
import { Button } from '@/components/ui/button';

import Spinner from '@/components/Spinner';
import Image from 'next/image';
import { useVerifyPassResetCode } from '../hook/useAuth';

interface Props {
    onComplete : () => void
}

const formSchema = z.object({
  pin: z.string().min(6, {
    message: "Your code must bg 6-digit."
  })
});

export const PasswordResetCodeForm = ({onComplete} : Props) => {
  const {loading , onVerifyPassResetCode} = useVerifyPassResetCode();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: ""
    }
  });

  const onSubmit = async (values : z.infer<typeof formSchema>) => {
    console.log("the otp value" , values);
    const email = localStorage.getItem("travo-user-email") || "";

    const isVerified = await onVerifyPassResetCode({email , pin : Number(values.pin)})

    if(isVerified){
      onComplete();
    }
  }

  return (
    <>
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

        {/* start to heading and description */}

        <div className=' flex flex-col gap-4'>
          <h3 className=' text-lg font-semibold'>Password reset</h3>
          <p className=' text-sm text-muted-foreground'>
            Please enter the 6-digit code we sent to {" "}
            <span className=' font-medium text-primary'>
              {!localStorage.getItem("travo-user-email") ? "" : localStorage.getItem("travo-user-email")}
            </span>
          </p>
        </div>
        {/* end to heading and description */}
      </div>
      {/* end to logo  */}

      {/* start to otp form */}
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)();
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
            disabled = {loading}
          >
            {loading ? <Spinner size="sm" /> : "Submit"}
          </Button>
        </form>
      </Form>
      {/* end to otp form */}
    </>

  )
}
