import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Spinner from "@/components/Spinner";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useResetPassword } from "../hook/useAuth";

interface Props {
    onComplete: () => void;
}

const formSchema = z.object({
    newPassword: z.string().min(6, {
        message: "Password must be at least 8 characters long",
    }),
    confirmPassword: z.string().min(6, {
        message: "Password must be at least 8 characters long",
    }),
});

export const NewPasswordForm = ({ onComplete }: Props) => {
    const {loading , onResetPassword} = useResetPassword();
    const [isEyeOpen, setIsEyeOpen] = useState<{
        newPasswordShow : boolean , 
        confirmPasswordShow : boolean
    }>({
        newPasswordShow : false,
        confirmPasswordShow : false
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("new password form", values);

        if(values.confirmPassword !== values.newPassword){    
            toast.error("New Password and confirm password is dose not match")     
            return ;   
        }

        const email = localStorage.getItem("travo-user-email") || "";

        const isVerified = await onResetPassword({email , newPassword : values.newPassword});

        if(isVerified){
            onComplete();
        }
    };

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
                    Set new password
                </h3>
                {/* end to heading */}

                {/* start to description */}
                <p className=" text-sm text-muted-foreground">
                    Must be at last 8 characters.
                </p>
                {/* end to description */}
            </div>
            {/* end to logo and description  */}

            {/* start to password form */}
            <Form {...form}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit(onSubmit)();
                    }}
                    className="flex flex-col gap-6"
                >
                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <div className=" flex items-center justify-between">
                                        <FormLabel>New Password</FormLabel>
                                    </div>
                                    <FormControl>
                                        <div className=" relative ">
                                            <Input
                                                id="newPassword"
                                                type={isEyeOpen.newPasswordShow ? "text" : "password"}
                                                placeholder={"••••••••"}
                                                value={field.value}
                                                onChange={field.onChange}
                                                required
                                            />
                                            <span 
                                                onClick={() => setIsEyeOpen((prev) => ({
                                                    ...prev,
                                                    newPasswordShow : !prev.newPasswordShow
                                                }))}
                                            >
                                                {isEyeOpen.newPasswordShow ? (
                                                    <Eye className=" size-5 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer " />
                                                ) : (
                                                    <EyeOff className=" size-5 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer " />
                                                )}
                                            </span>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <div className=" flex items-center justify-between">
                                        <FormLabel>Confirm Password</FormLabel>
                                    </div>
                                    <FormControl>
                                        <div className=" relative ">
                                            <Input
                                                id="confirmPassword"
                                                type={isEyeOpen.confirmPasswordShow ? "text" : "password"}
                                                placeholder={"••••••••"}
                                                value={field.value}
                                                onChange={field.onChange}
                                                required
                                            />
                                            <span 
                                                onClick={() => setIsEyeOpen((prev) => ({
                                                    ...prev,
                                                    confirmPasswordShow : !prev.confirmPasswordShow
                                                }))}
                                            >
                                                {isEyeOpen.confirmPasswordShow ? (
                                                    <Eye className=" size-5 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer " />
                                                ) : (
                                                    <EyeOff className=" size-5 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer " />
                                                )}
                                            </span>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full cursor-pointer"
                    >
                        {loading ? <Spinner size="sm" /> : "Sign in"}
                    </Button>
                </form>
            </Form>
            {/* end to password form */}
        </>
    );
};
