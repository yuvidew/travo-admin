"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";

import { ArrowLeft } from "lucide-react";
import { EmailSendForm } from "./email-send-form";
import { Progress } from "@/components/ui/progress";
import { PasswordResetCodeForm } from "./PasswordResetCodeForm";
import { NewPasswordForm } from "./new-password-form";
import { useRouter } from "next/navigation";

export const ForgetPasswordForm = () => {
    const router = useRouter()
    const [isCompleted, setIsCompleted] = useState({
        emailSend: "processing",
        otpSend: "pending",
        changePassword: "pending",
    });

    useEffect(() => {

        if (isCompleted.changePassword === "completed") {
            setTimeout(() => {
                setIsCompleted({
                    emailSend: "processing",
                    otpSend: "pending",
                    changePassword: "pending",
                });

                router.push("/sign-in")
            }, 1000)
        }

    }, [isCompleted])

    return (
        <div className="flex flex-col gap-6 relative">
            <div className=" flex flex-col gap-6">

                {/* start to form */}
                {isCompleted.emailSend === "processing" && (
                    <EmailSendForm
                        onComplete={() =>
                            setIsCompleted((prev) => ({
                                ...prev,
                                emailSend: "completed",
                                otpSend: "processing",
                            }))
                        }
                    />
                )}

                {isCompleted.otpSend === "processing" && (
                    <PasswordResetCodeForm
                        onComplete={() =>
                            setIsCompleted((prev) => ({
                                ...prev,
                                otpSend: "completed",
                                changePassword: "processing",
                            }))
                        }
                    />
                )}

                {(isCompleted.changePassword === "processing" || isCompleted.changePassword === "completed") && (
                    <NewPasswordForm
                        onComplete={() =>
                            setIsCompleted((prev) => ({
                                ...prev,
                                // emailSend: "processing",
                                changePassword: "completed",
                                // otpSend: "pending"
                            }))
                        }
                    />
                )}


                {/* end to form */}

                <div className=" flex items-center justify-end">
                    <Link
                        href={"/sign-in"}
                        className=" items-center gap-1 ml-auto flex text-sm underline-offset-4 hover:underline"
                    >
                        <ArrowLeft className=" size-4" />
                        back to sign in
                    </Link>
                </div>
            </div>

            {/* start to progress tabs */}
            <div className=" absolute -bottom-16 left-0 w-full flex items-center justify-between gap-2">
                <Progress value={isCompleted.emailSend === "completed" ? 100 : 0} />
                <Progress value={isCompleted.otpSend === "completed" ? 100 : 0} />
                <Progress
                    value={isCompleted.changePassword === "completed" ? 100 : 0}
                />
            </div>
            {/* end to progress tabs */}
        </div>
    );
};
