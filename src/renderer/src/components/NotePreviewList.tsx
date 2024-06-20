import { useNotesList } from "@renderer/hooks/useNotesList"
import { cn } from "@renderer/utils"
import { isEmpty } from "lodash"
import { ComponentProps } from "react"
import { NotePreview } from "./NotePreview"
export type NotePreviewListProps = ComponentProps<"ul"> & {
  onSelect?: () => void
}

export const NotePreviewList = ({ onSelect, className, ...props }: NotePreviewListProps) => {
  const { notes, selectedNoteIndex, handleNotesSelect } = useNotesList({ onSelect })
  if (!notes) return null
  if (isEmpty(notes)) {
    return (
      <ul className={cn("text-center pt-4", className)} {...props}>
        <span>No notes yet</span>
      </ul>
    )
  }
  return (
    <ul className={className} {...props}>
      {notes.map((note, index) => (
        <NotePreview
          isActive={selectedNoteIndex === index}
          key={note.title + note.lastEditTime}
          onClick={handleNotesSelect(index)}
          {...note}
        />
      ))}
    </ul>
  )
}
