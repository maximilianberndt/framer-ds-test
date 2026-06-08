/**
 * Ambient types for Framer code components.
 * The `framer` module is provided by the Framer runtime — not installed in this repo.
 */
declare module "https://esm.sh/gh/maximilianberndt/framer-ds-test@main/src/framer/styles.js?external=react" {
  export const STYLE_URL: string;
  export function useDsStyles(): void;
  export function useLoadDsStyles(href: string): void;
}

declare module "framer" {
  import type { ComponentType } from "react";

  export const ControlType: {
    Boolean: "boolean";
    Number: "number";
    String: "string";
    Enum: "enum";
    Color: "color";
    ResponsiveImage: "responsiveimage";
    File: "file";
    Array: "array";
    Slot: "slot";
    EventHandler: "eventhandler";
    Font: "font";
    Transition: "transition";
    BoxShadow: "boxshadow";
    Link: "link";
    Date: "date";
    Object: "object";
    Border: "border";
    Cursor: "cursor";
    Padding: "padding";
    BorderRadius: "borderradius";
    ComponentInstance: "componentinstance";
  };

  export function addPropertyControls(
    component: ComponentType<unknown>,
    propertyControls: Record<string, unknown>,
  ): void;

  export function useIsStaticRenderer(): boolean;
}

declare module "https://esm.sh/gh/maximilianberndt/framer-ds-test@main/dist/styles.js" {
  export const STYLE_URL: string;
}

declare module "https://cdn.jsdelivr.net/gh/maximilianberndt/framer-ds-test@main/dist/style.css";

declare module "https://esm.sh/gh/maximilianberndt/framer-ds-test@main/dist/framer-ds-test.js?external=react,react-dom" {
  import type { ComponentType, ReactNode } from "react";

  export const Button: ComponentType<{
    label: string;
    variant: "Primary" | "Secondary";
  }>;

  export const Badge: ComponentType<{
    text: string;
    variant: "Light" | "Dark";
  }>;

  export const Media: ComponentType<{
    image?: { src: string; srcSet?: string; alt?: string };
    videoUrl?: string;
    youtubeUrl?: string;
  }>;

  export const ProjectCard: ComponentType<{
    title?: string;
    description?: string;
    image?: { src: string; alt?: string };
    link?: { href: string; target?: string };
  }>;

  export const PageHero: ComponentType<{
    title?: string;
    description?: string;
    button?: ReactNode;
    media?: ReactNode;
  }>;

  export const ProjectList: ComponentType<{
    heading?: string;
  }>;
}
