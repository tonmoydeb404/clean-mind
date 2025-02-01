import { ReactNode } from "react";

type Props = {
  children: ReactNode;
} & JSX.IntrinsicElements["button"];

const IconButton = (props: Props) => {
  const { children, ...others } = props;
  return <button {...others}>{children}</button>;
};

export default IconButton;
