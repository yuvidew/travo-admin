import { useState } from "react";


export const useSendOtp = () => {
    const [loading , setLoading] = useState(false);

    const onSendOTP = async(form) => {
        setLoading(true)
        try {
            // TODO: implement a axios function to post OTP 
        } catch (error) {
            console.log("Error to send otp" , error);
        }finally{
            setLoading(false)
        }
    }

    return { loading , onSendOTP}
}

export const useSignUp = () => {
    const [loading , setLoading] = useState(false);

    const onSignUp = async(form) => {
        setLoading(true)
        try {
            // TODO: implement a axios function to post sign up request 
        } catch (error) {
            console.log("Error to send otp" , error);
        }finally{
            setLoading(false)
        }
    }

    return { loading , onSignUp}
}


export const useSignIn = () => {
    const [loading , setLoading] = useState(false);

    const onSignIn = async(form) => {
        setLoading(true)
        try {
            // TODO: implement a axios function to post sign in request 
        } catch (error) {
            console.log("Error to send otp" , error);
        }finally{
            setLoading(false)
        }
    }

    return { loading , onSignIn}
}
