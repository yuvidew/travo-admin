// hooks/useAuthRedirect.ts
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuthRedirect(redirectTo = "/sign-in") {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("travo-user");
    const token = localStorage.getItem("travo-token");

    if (!user || !token) {
      router.replace(redirectTo);
    }
  }, [router, redirectTo]);
}
