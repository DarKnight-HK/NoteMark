import { ComponentProps } from "react"
import { DeleteNoteButton, NewNoteButton } from "./Button"
import { ModeToggle } from "./mode-toggle"

export const ActionButtonRow = ({ ...props }: ComponentProps<"div">) => {
  return (
    <div {...props}>
      <NewNoteButton />
      <ModeToggle />
      <DeleteNoteButton />
    </div>
  )
}
