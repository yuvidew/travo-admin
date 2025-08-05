"use client"
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  const onLogout = () => {
    localStorage.removeItem("travo-token");
    localStorage.removeItem("travo-user");
    router.replace("/sign-in")
  }
  return (
    <main>
      <SidebarTrigger/>
      <Button onClick={onLogout}>
        Logout
      </Button>

    </main>
  );
}
