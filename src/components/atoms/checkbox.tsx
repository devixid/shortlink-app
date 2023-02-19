import clsx from "clsx";
import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { memo } from "react";

import { BiCheck } from "react-icons/bi";

function Checkbox({
  checked,
  className,
  ...props
}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <div className={clsx("input-checkbox", checked && "checked")}>
      <input
        type="checkbox"
        checked={checked}
        className={undefined}
        {...props}
      />

      <div className={clsx("checkbox", className)}>
        <BiCheck
          className={clsx(
            "h-4 w-4 text-white",
            checked ? "visible opacity-100" : "invisible opacity-0"
          )}
        />
      </div>
    </div>
  );
}

export default memo(Checkbox);
