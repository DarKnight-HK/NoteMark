import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}

const dateFormatter = new Intl.DateTimeFormat(window.context.locale, {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "UTC"
})

export const formatDate = (ms: number) => dateFormatter.format(ms + 1.8e7)
