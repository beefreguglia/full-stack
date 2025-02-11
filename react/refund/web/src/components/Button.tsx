import { classMerge } from "../utils/classMerge";

type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
  variant?: "base" | "icon";
}

const variants = {
  button: {
    base: "h-12",
    icon: "h-12 w-12",
  },
}
export function Button({ 
  isLoading, 
  children, 
  type = "button",
  variant = "base",
  ...rest 
}: Props) {
  return (
    <button 
      className={
        classMerge([
          "flex items-center justify-center bg-green-100 text-white cursor-pointer hover:bg-green-200 transition ease-linear rounded-lg disabled:opacity-50 disabled:cursor-not-allowed",
          variants.button[variant],
        ])
      }
      type={type} 
      {...rest}
    >
      {children}
    </button>
  )
}