import { CreateNotes, GetNotes, ReadNotes, WriteNotes, DeleteNotes } from "@shared/types"
import { contextBridge, ipcRenderer } from "electron"

if (!process.contextIsolated) {
  throw new Error("contextIsolation is not enabled.")
}

try {
  contextBridge.exposeInMainWorld("context", {
    locale: navigator.language,
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke("getNotes", ...args),
    readNotes: (...args: Parameters<ReadNotes>) => ipcRenderer.invoke("readNotes", ...args),
    writeNote: (...args: Parameters<WriteNotes>) => ipcRenderer.invoke("writeNote", ...args),
    createNote: (...args: Parameters<CreateNotes>) => ipcRenderer.invoke("createNote", ...args),
    deleteNote: (...args: Parameters<DeleteNotes>) => ipcRenderer.invoke("deleteNote", ...args)
  })
} catch (error) {
  console.error("Failed to expose context to the renderer:", error)
}
