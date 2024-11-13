import { Link } from "react-router-dom";
import { CTAButtonProps } from "../types/CTAButtonProps";

const CTAButton: React.FC<CTAButtonProps> = ({
  to,
  text,
  fromColor,
  toColor,
  hoverFromColor,
  hoverToColor,
  onClick,
  type = "button",
  disabled = false,
}) => {
  const buttonClasses = `inline-block bg-gradient-to-r ${fromColor} ${toColor} text-white px-6 py-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 ${hoverFromColor} ${hoverToColor} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;

  return to === "#" ? (
    <button
      onClick={onClick}
      className={buttonClasses}
      type={type}
      disabled={disabled}
    >
      <span className="font-bold">{text}</span>
    </button>
  ) : (
    <Link to={to} className={buttonClasses}>
      <span className="font-bold">{text}</span>
    </Link>
  );
};

export default CTAButton;
