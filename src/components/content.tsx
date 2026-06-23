import clsx from "clsx";

export default function Content({ children, fullWidth = false }: { children: React.ReactNode, fullWidth?: boolean}) {
  return <main className={clsx("prose p-5", fullWidth || "container mx-auto")}>{children}</main>;
}
