import { deleteNoteAtom } from "@renderer/store"
import { useSetAtom } from "jotai"
import { FaRegTrashCan } from "react-icons/fa6"
import { ActionButton, ActionButtonProps } from "./ActionButton"
export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const deleteNote = useSetAtom(deleteNoteAtom)
  const handleDelete = async () => {
    await deleteNote()
  }
  return (
    <ActionButton onClick={handleDelete} {...props}>
      <FaRegTrashCan className="size-4 text-zinc-300" />
    </ActionButton>
  )
}