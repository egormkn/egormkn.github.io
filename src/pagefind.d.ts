import * as React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "pagefind-modal-trigger": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        placeholder?: string;
        shortcut?: string;
        "hide-shortcut"?: boolean;
        compact?: boolean;
        instance?: string;
      };
      "pagefind-modal": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        "reset-on-close"?: boolean;
        instance?: string;
      };
    }
  }
}
