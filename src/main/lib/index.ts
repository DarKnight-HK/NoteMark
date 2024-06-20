import { NoteInfo } from "@shared/models"
import { CreateNotes, DeleteNotes, GetNotes, ReadNotes, WriteNotes } from "@shared/types"
import { ensureDir, readFile, readdir, remove, stat, writeFile } from "fs-extra"
import { fileEncoding } from "../../shared/constants"
import { dialog } from "electron"
import path from "path"
import { isEmpty } from "lodash"
import Welcome from "../../../resources/Welcome.md?asset"
export const getRootDir = () => {
  return `/home/hex/Documents/NoteMark`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)
  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })
  const notes = notesFileNames.filter((fileName) => fileName.endsWith(".md"))
  if (isEmpty(notes)) {
    const content = await readFile(Welcome, { encoding: fileEncoding })
    await writeFile(`${rootDir}/Welcome.md`, content, { encoding: fileEncoding })
    notes.push("Welcome.md")
  }
  return Promise.all(notes.map(getNotesInfoFromFileName))
}

export const getNotesInfoFromFileName = async (fileName: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${fileName}`)
  return {
    title: fileName.replace(/\.md$/, ""),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNotes = async (noteTitle: string) => {
  const rootDir = getRootDir()
  const path = `${rootDir}/${noteTitle}.md`
  return readFile(path, { encoding: fileEncoding })
}

export const writeNote: WriteNotes = async (noteTitle, content) => {
  const rootDir = getRootDir()
  const path = `${rootDir}/${noteTitle}.md`
  return writeFile(path, content, { encoding: fileEncoding })
}

export const createNote: CreateNotes = async () => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)
  const { filePath, canceled } = await dialog.showSaveDialog({
    title: "Create a new note",
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: "Create",
    properties: ["showOverwriteConfirmation"],
    showsTagField: false,
    filters: [{ name: "Markdown", extensions: ["md"] }]
  })
  if (!filePath || canceled) {
    console.info("Note creation cancelled")
    return false
  }
  const { name: filename, dir: parentDir } = path.parse(filePath)
  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: "error",
      title: "Creation Failed",
      message: `Notes must be created in the root directory ${rootDir} ${parentDir}`
    })
    return false
  }
  await writeFile(filePath, "", { encoding: fileEncoding })
  return filename
}
export const deleteNote: DeleteNotes = async (filename) => {
  const rootDir = getRootDir()

  const { response } = await dialog.showMessageBox({
    type: "warning",
    title: "Delete note",
    message: `Are you sure you want to delete ${filename}?`,
    buttons: ["Delete", "Cancel"], // 0 is Delete, 1 is Cancel
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    console.info("Note deletion canceled")
    return false
  }

  console.info(`Deleting note: ${filename}`)
  await remove(`${rootDir}/${filename}.md`)
  return true
}
