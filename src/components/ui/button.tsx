import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
} & JSX.IntrinsicElements["button"];

const Button = (props: Props) => {
  const { children, className, ...others } = props;
  return (
    <button
      className={twMerge(
        "inline-flex items-center justify-center gap-2",
        "cursor-pointer duration-200 rounded-md border border-transparent",
        "border-neutral/20 hover:bg-neutral/10",
        "px-4 py-2 text-sm font-medium",
        className
      )}
      {...others}
    >
      {children}
    </button>
  );
};

export default Button;
