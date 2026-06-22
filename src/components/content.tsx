export default function Content({ children, fullWidth = false }: { children: React.ReactNode, fullWidth?: boolean}) {
  return <div className={fullWidth ? "" : "container mx-auto"}>{children}</div>;
}
