import { Suspense } from "react";
import NotFound from "@/components/organisms/not-found";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <NotFound />
    </Suspense>
  );
}
