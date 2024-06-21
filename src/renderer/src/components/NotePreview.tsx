import { cn, formatDate } from "@renderer/utils"
import { NoteInfo } from "@shared/models"
import { ComponentProps } from "react"

export type NotePreviewProps = NoteInfo & {
  isActive: boolean
} & ComponentProps<"div">

export const NotePreview = ({
  title,
  content,
  lastEditTime,
  className,
  isActive = false,
  ...props
}: NotePreviewProps) => {
  const date = formatDate(lastEditTime)
  return (
    <div
      className={cn(
        "cursor-pointer px-2.5 py-3 group rounded-xl transition-colors duration-75",
        { "bg-[#4F46E5]/75": isActive, "hover:bg-[#4F46E5]/60": !isActive },
        className
      )}
      {...props}
    >
      <h3
        className={
          (cn("mb-1 font-bold truncate"),
          isActive ? "text-white" : "group-hover:text-white dark:text-white text-zinc-600")
        }
      >
        {title}
      </h3>
      <span
        className={
          (cn("inline-block w-full mb-2 text-xs font-light text-left"),
          isActive ? "text-white" : "group-hover:text-white dark:text-white text-zinc-600")
        }
      >
        {date}
      </span>
    </div>
  )
}
