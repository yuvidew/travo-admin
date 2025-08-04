import { NextResponse } from "next/server";

export async function GET() {
    try {
        // console.log("hello");
        const redirect_uri = process.env.GOOGLE_REDIRECT_URI!; 
        const client_id = process.env.GOOGLE_CLIENT_ID!;
        const scope = "openid email profile";
        const state = 'secure_random_string';

        if (!redirect_uri || !client_id) {
            throw Error("Missing Google OAuth environment variables")
        }

        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=${state}`;

        return NextResponse.redirect(googleAuthUrl);

    } catch (error) {
        console.error("Error during Google OAuth redirect:", error);
        return NextResponse.json(
            { error: "Failed to initiate Google OAuth flow" },
            { status: 500 }
        );
    }
}