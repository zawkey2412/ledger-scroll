export interface CTAButtonProps {
  to: string;
  text: string;
  fromColor: string;
  toColor: string;
  hoverFromColor: string;
  hoverToColor: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

