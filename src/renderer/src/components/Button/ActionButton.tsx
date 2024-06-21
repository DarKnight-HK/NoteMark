import { cn } from "@renderer/utils"
import { ComponentProps } from "react"

export type ActionButtonProps = ComponentProps<"button">

export const ActionButton = ({ className, children, ...props }: ActionButtonProps) => {
  return (
    <button
      className={cn(
        "px-2 py-1 rounded-md border dark:border-zinc-300/50 border-zinc-600/50 dark:hover:bg-zinc-600/50 hover:bg-zinc-300/50 transition-colors duration-100 border-b-4 active:border-b-0",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
