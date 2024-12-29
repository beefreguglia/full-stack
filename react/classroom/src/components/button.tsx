import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  name: string;
}

export function Button({ name, ...rest }: ButtonProps) {
  return <button {...rest}>{name}</button>
}