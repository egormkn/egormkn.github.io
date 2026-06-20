"use client";

// Error boundaries must be Client Components
import Header from "@/components/header";
import RootLayout from "@/components/root-layout";

export default function GlobalError({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const locale = "en"; // Default to English for the error page

  return (
    <RootLayout lang={locale}>
      <Header />
      <h2>Something went wrong!</h2>
      <button onClick={() => unstable_retry()}>Try again</button>
    </RootLayout>
  );
}
