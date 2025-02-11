type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
}

export function Button({ 
  isLoading, 
  children, 
  type = "button", 
  ...rest 
}: Props) {
  return (
    <button 
      className="flex items-center justify-center bg-green-100 text-white cursor-pointer hover:bg-green-200 transition ease-linear rounded-lg disabled:opacity-50 disabled:cursor-not-allowed h-12"
      type={type} 
      {...rest}
    >
      {children}
    </button>
  )
}