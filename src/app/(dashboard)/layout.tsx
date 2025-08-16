import { SideBarProvider } from "@/components/providers/SideBarProvider";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();

    const user = cookieStore.get("travo-user")?.value;
    const token = cookieStore.get("travo-token")?.value;

    if (!user || !token) {
        console.log("❌ Redirecting to sign-in, cookies missing");
        return redirect("/sign-in",);
    }
    return (
        <div>
            <SideBarProvider>
                {children}
            </SideBarProvider>
        </div>
    )
}