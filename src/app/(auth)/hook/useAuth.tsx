import { useState } from "react";
import { AuthFormType } from "../types/type";
import axios from "axios"
import { endPoints } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";

/**
 * Custom hook to handle sending OTP to the server.
 * 
 * @returns {object} Object with `loading` state and `onSendOTP` function.
 */

export const useSendOtp = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    /**
     * Sends the OTP to the backend for verification.
     *
     * @param {{ pin: string }} form - Object containing the OTP as a string.
     */

    const onSendOTP = async (form: { pin: string, email: string }) => {
        setLoading(true);
        try {

            const { data, status } = await axios.post(endPoints.verify_otp, { email: form.email, pin: Number(form.pin) });

            if (status === 200) {
                toast.success(data.message);

                // localStorage.setItem("travo-token", data.token);
                // localStorage.setItem("travo-user", JSON.stringify(data.user));

                setCookie(null, "travo-token", data.token, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: "/",
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax", // 👈 safer
                });

                setCookie(null, "travo-user", JSON.stringify(data.user), {
                    maxAge: 30 * 24 * 60 * 60,
                    path: "/",
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax", // 👈 safer
                });


                localStorage.removeItem("travo-user-email");

                setTimeout(() => {
                    router.replace("/");
                }, 2000);
            } else if (status === 409) {
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error to send otp", error);
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    toast.error("Invalid email and password.");
                    return false;
                } else if (error.response?.status === 400) {
                    toast.error(error.response.data.message);
                    return false;
                }
            } else {
                toast.error("An unexpected error occurred.", {
                    duration: 4000,
                    position: "top-center",
                });
            }
        } finally {
            setLoading(false)
        }
    }

    return { loading, onSendOTP }
}

/**
 * Custom hook to handle user sign-up.
 *
 * @returns {object} Object with `loading` state and `onSignUp` function.
 */
export const useSignUp = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);

    /**
     * Handles user sign-up and redirects to sign-in page on success.
     *
     * @param {AuthFormType} form - User credentials for sign-up.
     */
    const onSignUp = async (form: AuthFormType) => {
        setLoading(true)
        try {
            const { data, status } = await axios.post(endPoints.signup, form);

            if (status === 200) {
                toast.success("Successfully sign up.");
                setTimeout(() => {
                    router.replace("/sign-in");
                }, 2000);
            } else if (status === 409) {
                toast.error(data.message);
            }

        } catch (error: unknown) {
            console.log("Error to sign up", error);

            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    toast.error("Invalid email and password.");
                } else if (error.response?.status === 400) {
                    toast.error(error.response.data.message);
                }
            } else {
                toast.error("An unexpected error occurred.", {
                    duration: 4000,
                    position: "top-center",
                });
            }
        } finally {
            setLoading(false)
        }
    }

    return { loading, onSignUp }
}

/**
 * Custom hook to handle user sign-in.
 *
 * @returns {object} Object with `loading` state and `onSignIn` function.
 */
export const useSignIn = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);

    /**
     * Handles user sign-in and redirects to OTP page on success.
     *
     * @param {AuthFormType} form - User credentials for sign-in.
     */
    const onSignIn = async (form: AuthFormType) => {
        setLoading(true)
        try {
            const { data, status } = await axios.post(endPoints.signin, form);

            if (status === 200) {
                toast.success(data.message);
                localStorage.setItem("travo-user-email", form.email);
                setTimeout(() => {
                    router.replace("/otp");
                }, 2000);
            } else if (status === 409) {
                toast.error(data.message);
            } else if (status === 400 || data.code === 400) {
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error to sign in", error);

            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    toast.error("Invalid email and password.");
                } else if (error.response?.status === 400) {
                    toast.error(error.response.data.message);
                }
            } else {
                toast.error("An unexpected error occurred.", {
                    duration: 4000,
                    position: "top-center",
                });
            }
        } finally {
            setLoading(false)
        }
    }

    return { loading, onSignIn }
}

/**
 * Hook to verify user email before registration.
 * 
 * @returns {Object} - loading state and onVerifyEmail function
 */
export const useVerifyEmail = () => {
    const [loading, setLoading] = useState(false);

    /**
     * Verify email address by sending it to the server.
     *
     * @param {{ email: string }} form - Form object containing the user's email
     * @returns {Promise<boolean>} - Returns true if verification successful, false otherwise
     */
    const onVerifyEmail = async (form: { email: string }) => {
        setLoading(true);

        try {
            const { data, status } = await axios.post(endPoints.verify_email, form);

            if (status === 200) {
                toast.success(data.message);
                localStorage.setItem("travo-user-email", form.email)
                return data.success;
            } else if (status === 409) {
                toast.error(data.message);

                return false;
            }

        } catch (error) {
            console.log("Error to verify email", error);

            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    toast.error("Invalid email and password.");
                    return false;
                } else if (error.response?.status === 400) {
                    toast.error(error.response.data.message);
                    return false;
                }

                return false;

            } else {
                toast.error("An unexpected error occurred.", {
                    duration: 4000,
                    position: "top-center",
                });
                return false;
            }
        } finally {
            setLoading(false)
        }
    }

    return { loading, onVerifyEmail }
}

/**
 * Hook to verify OTP / PIN for password reset.
 *
 * @returns {Object} - loading state and onVerifyPassResetCode function
 */
export const useVerifyPassResetCode = () => {
    const [loading, setLoading] = useState(false);

    /**
     * Verify OTP / PIN for resetting the password.
     *
     * @param {{ email: string, pin: number }} form - Form object containing email and pin
     * @returns {Promise<boolean>} - Returns true if OTP is correct, false otherwise
     */
    const onVerifyPassResetCode = async (form: { email: string, pin: number }) => {
        setLoading(true);

        try {
            const { data, status } = await axios.post(endPoints.verify_forget_pass_otp, form);

            if (status === 200) {
                toast.success(data.message);
                localStorage.setItem("travo-reset-password-token-verify" , data.token)
                return data.success;
            } else if (status === 409) {
                toast.error(data.message);

                return false;
            }
        } catch (error) {
            console.log("Error to verify reset pass otp", error);

            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    toast.error("Invalid email and password.");
                    return false;
                } else if (error.response?.status === 400) {
                    toast.error(error.response.data.message);
                    return false;
                }

                return false;

            } else {
                toast.error("An unexpected error occurred.", {
                    duration: 4000,
                    position: "top-center",
                });
                return false;
            }
        } finally {
            setLoading(false);
        }
    }

    return { loading, onVerifyPassResetCode }
}

/**
 * Hook to reset user password.
 *
 * @returns {Object} - loading state and onResetPassword function
 */
export const useResetPassword = () => {
    const [loading, setLoading] = useState(false);

    /**
     * Reset user password by sending email and new password to the server.
     *
     * @param {{ email: string, newPassword: string }} form - Form object containing email and new password
     * @returns {Promise<boolean>} - Returns true if password reset successful, false otherwise
     */
    const onResetPassword = async (form: { email: string, newPassword: string }) => {
        setLoading(true);

        const reset_pass_token = localStorage.getItem("travo-reset-password-token-verify")

        try {
            const { data, status } = await axios.put(endPoints.reset_password, form , {
                headers : {
                    Authorization : `Bearer ${reset_pass_token}`
                }
            });

            if (status === 200) {
                toast.success(data.message);
                localStorage.removeItem("travo-user-email");
                localStorage.removeItem("travo-reset-password-token-verify");
                return data.success;
            } else if (status === 409) {
                toast.error(data.message);

                return false;
            }
        } catch (error) {
            console.log("Error to reset password", error);

            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    toast.error("Invalid email and password.");
                    return false;
                } else if (error.response?.status === 400) {
                    toast.error(error.response.data.message);
                    return false;
                }

                return false;

            } else {
                toast.error("An unexpected error occurred.", {
                    duration: 4000,
                    position: "top-center",
                });
                return false;
            }
        } finally {
            setLoading(false);
        }
    }

    return { loading, onResetPassword }
}
