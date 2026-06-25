import clsx from "clsx";

export default function Content({ children, fullWidth = false }: { children: React.ReactNode, fullWidth?: boolean}) {
  return <main className={clsx("flex flex-col grow", fullWidth || "container mx-auto")}>{children}</main>;
}
