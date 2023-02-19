import clsx from "clsx";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { memo } from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: "sm" | "md" | "lg";
  type: "button" | "submit" | "reset";
};

function Button({ size, children, type, className, ...props }: ButtonProps) {
  const getButtonSize = (): string => {
    switch (size) {
      case "sm":
        return "py-2 px-3";

      case "md":
        return "py-4 px-5";

      case "lg":
        return "py-5 px-6";

      default:
        return "py-3 px-4";
    }
  };

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type || "button"}
      className={clsx(
        getButtonSize(),
        "rounded border-0",
        "bg-slate-800 text-white",
        "hover:bg-slate-900 focus:bg-slate-900",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default memo(Button);
