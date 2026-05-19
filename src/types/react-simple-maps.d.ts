declare module "react-simple-maps" {
  import type { CSSProperties, ReactNode } from "react";

  export type GeographyProps = {
    geography: { rsmKey: string; properties?: Record<string, unknown> };
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    tabIndex?: number;
    style?: {
      default?: CSSProperties;
      hover?: CSSProperties;
      pressed?: CSSProperties;
    };
  };

  export function ComposableMap(props: {
    projection?: string;
    width?: number;
    height?: number;
    style?: CSSProperties;
    children?: ReactNode;
  }): JSX.Element;

  export function ZoomableGroup(props: {
    center?: [number, number];
    zoom?: number;
    children?: ReactNode;
  }): JSX.Element;

  export function Geographies(props: {
    geography: string;
    children: (helpers: {
      geographies: Array<{
        rsmKey: string;
        properties?: { name?: string };
      }>;
    }) => ReactNode;
  }): JSX.Element;

  export function Geography(props: GeographyProps): JSX.Element;
}
