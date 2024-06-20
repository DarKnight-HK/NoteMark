import { createEmptyNoteAtom } from "@renderer/store"
import { useSetAtom } from "jotai"
import { LuFileSignature } from "react-icons/lu"
import { ActionButton, ActionButtonProps } from "./ActionButton"

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)
  const handleCreate = async () => {
    await createEmptyNote()
  }
  return (
    <ActionButton onClick={handleCreate} {...props}>
      <LuFileSignature className="size-4 text-zinc-300" />
    </ActionButton>
  )
}
