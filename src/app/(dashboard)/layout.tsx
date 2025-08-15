import { SideBarProvider } from "@/components/providers/SideBarProvider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <SideBarProvider>

                {children}
            </SideBarProvider>
        </div>
    )
}