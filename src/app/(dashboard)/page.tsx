"use client"
import { Button } from "@/components/ui/button";
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
      <Button onClick={onLogout}>
        Logout
      </Button>
    </main>
  );
}
