import { useState } from "react";
import { AuthFormType } from "../types/type";
import axios from "axios"
import { endPoints } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

/**
 * Custom hook to handle sending OTP to the server.
 * 
 * @returns {object} Object with `loading` state and `onSendOTP` function.
 */

export const useSendOtp = () => {
    const router = useRouter();
    const [loading , setLoading] = useState(false);

    /**
     * Sends the OTP to the backend for verification.
     *
     * @param {{ pin: string }} form - Object containing the OTP as a string.
     */

    const onSendOTP = async(form : {pin : string}) => {
        setLoading(true);
        try {

            const userEmail = localStorage.getItem("travo-user-email")
            const {data , status} = await axios.post(endPoints.verify_otp , {email : userEmail , pin : Number(form.pin)});

            if(status === 200){
                toast.success(data.message);

                localStorage.setItem("travo-token" , data.token);
                localStorage.setItem("travo-user" , JSON.stringify(data.user))

                setTimeout(() => {
                    router.replace("/");
                } , 2000); 
            }else if (status === 409){
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error to send otp" , error);
            if(axios.isAxiosError(error)){
                if(error.response?.status === 401){
                    toast.error(error.message);
                }
            }else {
                toast.error("An unexpected error occurred.", {
                    duration: 4000,
                    position: "top-center",
                });
            }
        }finally{
            setLoading(false)
        }
    }

    return { loading , onSendOTP}
}

/**
 * Custom hook to handle user sign-up.
 *
 * @returns {object} Object with `loading` state and `onSignUp` function.
 */
export const useSignUp = () => {
    const router = useRouter()
    const [loading , setLoading] = useState(false);

    /**
     * Handles user sign-up and redirects to sign-in page on success.
     *
     * @param {AuthFormType} form - User credentials for sign-up.
     */
    const onSignUp = async(form : AuthFormType) => {
        setLoading(true)
        try {
            const {data , status} = await axios.post(endPoints.signup , form);

            if(status === 200){
                toast.success("Successfully sign up.");
                setTimeout(() => {
                    router.replace("/sign-in");
                } , 2000); 
            }else if (status === 409){
                toast.error(data.message);
            }

        } catch (error : unknown) {
            console.log("Error to sign up" , error);

            if(axios.isAxiosError(error)){
                if(error.response?.status === 401){
                    toast.error(error.message);
                }
            }else {
                toast.error("An unexpected error occurred.", {
                    duration: 4000,
                    position: "top-center",
                });
            }
        }finally{
            setLoading(false)
        }
    }

    return { loading , onSignUp}
}

/**
 * Custom hook to handle user sign-in.
 *
 * @returns {object} Object with `loading` state and `onSignIn` function.
 */
export const useSignIn = () => {
    const router = useRouter()
    const [loading , setLoading] = useState(false);

    /**
     * Handles user sign-in and redirects to OTP page on success.
     *
     * @param {AuthFormType} form - User credentials for sign-in.
     */
    const onSignIn = async(form : AuthFormType) => {
        setLoading(true)
        try {
            const {data , status} = await axios.post(endPoints.signin , form);

            if(status === 200){
                toast.success(data.message);
                localStorage.setItem("travo-user-email" , form.email)
                setTimeout(() => {
                    router.replace("/otp");
                } , 2000); 
            }else if (status === 409){
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error to sign in" , error);

            if(axios.isAxiosError(error)){
                if(error.response?.status === 401){
                    toast.error(error.message);
                }
            }else {
                toast.error("An unexpected error occurred.", {
                    duration: 4000,
                    position: "top-center",
                });
            }
        }finally{
            setLoading(false)
        }
    }

    return { loading , onSignIn}
}
