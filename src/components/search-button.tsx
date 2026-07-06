"use client";

import { useTheme } from "next-themes";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { PagefindComponent, usePagefindComponents } from "./pagefind";

export default function SearchButton({ instance = undefined }: { instance?: string }) {
  const { resolvedTheme } = useTheme();
  const pagefindComponents = usePagefindComponents();
  const triggerRef = useRef<PagefindComponent | null>(null);
  const modalRef = useRef<PagefindComponent | null>(null);

  const [theme, setTheme] = useState("light");

  useLayoutEffect(() => {
    setTheme(resolvedTheme!);
  }, [resolvedTheme]);

  useEffect(() => {
    if (!pagefindComponents) return;

    const component = modalRef.current!;

    const unregister = (component: PagefindComponent) => {
      const pagefindInstance = pagefindComponents.getInstanceManager().getInstance(instance);
      console.log("Pagefind instance:", pagefindInstance);
      console.log("Components:", pagefindInstance.components);
      for (const components of [pagefindInstance.componentsByType["utility"], pagefindInstance.components]) {
        console.log("Unregistering component:", component, "from", components);
        const index = components.indexOf(component);
        if (index > -1) {
          components.splice(index, 1);
          console.log(`Unregistered component: ${component.tagName}`);
        }
      }
    };

    return () => {
      unregister(component);
    };
  }, [pagefindComponents, instance]);

  return (
    <>
      <pagefind-modal-trigger
        ref={triggerRef}
        instance={instance}
        compact
        data-pf-theme={theme}
      ></pagefind-modal-trigger>
      <pagefind-modal ref={modalRef} instance={instance} data-pf-theme={theme}></pagefind-modal>
    </>
  );
}
