import HomeClient from "@/components/HomeClient";
import { Loader } from "lucide-react";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen text-muted-foreground">
        <Loader size={32} />
      </div>
    }>
      <HomeClient />
    </Suspense>
  )
}
