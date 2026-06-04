export interface TokenColor {
  primitive: Record<string, string>;
  semantic: Record<string, string>;
}

export interface TokenSpacing {
  scale: Record<string, string>;
}

export interface TokenTypography {
  fontFamilies: Record<string, string>;
  scale: Record<string, string>;
  leading: Record<string, string>;
}

export interface TokenMotion {
  duration: Record<string, string>;
  easing: Record<string, string>;
}

export interface TokenRadius {
  scale: Record<string, string>;
}

export interface TokenShadow {
  scale: Record<string, string>;
}

export interface TokenZIndex {
  scale: Record<string, string>;
}
