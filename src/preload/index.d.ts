import { GetNotes, ReadNotes, WriteNotes } from "@shared/types"

declare global {
  interface Window {
    context: {
      locale: string
      getNotes: GetNotes
      readNotes: ReadNotes
      writeNote: WriteNotes
      createNote: CreateNotes
      deleteNote: DeleteNotes
    }
  }
}
