"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ children, ...props }: React.ComponentPropsWithoutRef<"button">) {
  const router = useRouter();
  return <button onClick={() => router.back()} {...props}>
    {children}
  </button>;
}
