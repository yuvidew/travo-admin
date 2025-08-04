import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const code = searchParams.get("code");

        console.log("the code" , code );

        if (!code) {
            return new Response("No code provided", {
                status: 400
            });
        }

            const body = {
                code,
                client_id: process.env.GOOGLE_CLIENT_ID!,
                client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
                grant_type: "authorization_code"
            }

            
        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })

        if (!tokenRes.ok) {
            console.error("Google token error:", await tokenRes.text());
            return NextResponse.json({ error: "Invalid OAuth code" }, { status: 400 });
        }

        const tokenData = await tokenRes.json();

        if (!tokenData.access_token) {
            return NextResponse.json({ error: "No access token returned" }, { status: 500 });
        }

        const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${tokenData.access_token}`,
            },
        });

        if (!userInfoRes.ok) {
            console.error("Google userinfo error:", await userInfoRes.text());
            return NextResponse.json({ error: "Failed to fetch user info" }, { status: 500 });
        };
        
        const userInfo = await userInfoRes.json();
        
        if (!userInfo.email) {
            return NextResponse.json({ error: "Google account has no email" }, { status: 500 });
        };
        console.log("the user data from the google ", userInfo);

        // TODO : Integrate google-login backend api to Register or login user
        
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_CLIENT_URL}/sign-in?user=${encodeURIComponent(JSON.stringify(userInfo))}`
        );
    } catch (error) {
        console.error("Error in OAuth callback:", error);
        return new Response("Internal server error", { status: 500 })
    }
}