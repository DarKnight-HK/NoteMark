import { MDXEditorMethods } from "@mdxeditor/editor"
import { saveAtom, selectedNoteAtom } from "@renderer/store"
import { NoteContent } from "@shared/models"
import { useAtomValue, useSetAtom } from "jotai"
import { useRef } from "react"
import { throttle } from "lodash"
import { autoSavingTime } from "../../../shared/constants"

export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveAtom)
  const editorRef = useRef<MDXEditorMethods>(null)
  const handleAutoSaving = throttle(
    async (content: NoteContent) => {
      if (!selectedNote) return
      await saveNote(content)
    },
    autoSavingTime,
    {
      leading: false,
      trailing: true
    }
  )
  const handleBlur = async () => {
    if (!selectedNote) return
    handleAutoSaving.cancel()
    const content = editorRef.current?.getMarkdown()
    if (content) {
      await saveNote(content)
    }
  }
  return { selectedNote, editorRef, handleAutoSaving, handleBlur }
}
