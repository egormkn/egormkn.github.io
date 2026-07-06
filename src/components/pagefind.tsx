"use client";

import type {
  Instance,
  PagefindConfig,
  PagefindElement,
  PagefindFilterDropdown,
  PagefindFilterPane,
  PagefindInput,
  PagefindKeyboardHints,
  PagefindModal,
  PagefindModalBody,
  PagefindModalFooter,
  PagefindModalHeader,
  PagefindModalTrigger,
  PagefindResults,
  PagefindSearchbox,
  PagefindSummary,
} from "@pagefind/component-ui";
import "@pagefind/component-ui/css";
import Script from "next/script";
import { createContext, useContext, useState } from "react";

export type { Instance } from "@pagefind/component-ui";

export type PagefindComponent = Instance["components"][number];

export type PagefindComponents = {
  configureInstance: typeof import("@pagefind/component-ui").configureInstance;
  getInstanceManager: typeof import("@pagefind/component-ui").getInstanceManager;
  PagefindConfig: PagefindConfig,
  PagefindElement: PagefindElement,
  PagefindFilterDropdown: PagefindFilterDropdown,
  PagefindFilterPane: PagefindFilterPane,
  PagefindInput: PagefindInput,
  PagefindKeyboardHints: PagefindKeyboardHints,
  PagefindModal: PagefindModal,
  PagefindModalBody: PagefindModalBody,
  PagefindModalFooter: PagefindModalFooter,
  PagefindModalHeader: PagefindModalHeader,
  PagefindModalTrigger: PagefindModalTrigger,
  PagefindResults: PagefindResults,
  PagefindSearchbox: PagefindSearchbox,
  PagefindSummary: PagefindSummary,
};

type WindowWithPagefindComponents = Window &
  typeof globalThis & {
    PagefindComponents: PagefindComponents;
  };

const PagefindComponentsContext = createContext<PagefindComponents | null>(null);

export function PagefindComponentsProvider({ src, children }: { src: string; children: React.ReactNode }) {
  const [components, setComponents] = useState<PagefindComponents | null>(null);

  const onLoad = () => {
    setComponents((window as WindowWithPagefindComponents).PagefindComponents);
    console.debug("Pagefind components loaded");
  };

  return (
    <>
      <Script src={src} onLoad={onLoad}></Script>
      <PagefindComponentsContext value={components}>{children}</PagefindComponentsContext>
    </>
  );
}

export function usePagefindComponents() {
  return useContext(PagefindComponentsContext);
}
