import React from "react";

export default function Button({
  children,
  className,
  type,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}) {
  return (
    <button className={"btn " + className} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
