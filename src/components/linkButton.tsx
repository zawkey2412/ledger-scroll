import React from "react";
import { Link } from "react-router-dom";

interface LinkButtonProps {
  to: string;
  text: string;
  fromColor: string;
  toColor: string;
  hoverFromColor: string;
  hoverToColor: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  to,
  text,
  fromColor,
  toColor,
  hoverFromColor,
  hoverToColor,
}) => {
  return (
    <Link
      to={to}
      className={`mt-6 inline-block bg-gradient-to-r ${fromColor} ${toColor} text-white px-6 py-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:${hoverFromColor} hover:${hoverToColor}`}
    >
      <span className="font-bold">{text}</span>
    </Link>
  );
};

export default LinkButton;
