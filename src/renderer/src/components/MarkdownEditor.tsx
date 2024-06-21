import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin
} from "@mdxeditor/editor"
import { useMarkdownEditor } from "@renderer/hooks/useMarkdownEditor"

export const MarkdownEditor = () => {
  const { handleBlur, selectedNote, editorRef, handleAutoSaving } = useMarkdownEditor()
  if (!selectedNote) return null
  return (
    <MDXEditor
      ref={editorRef}
      onBlur={handleBlur}
      key={selectedNote.title}
      onChange={handleAutoSaving}
      plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin()]}
      markdown={selectedNote.content}
      contentEditableClassName="outline-none min-h-screen max-w-none text-lg dark:text-white text-zinc-600 px-8 py-5 dark:caret-yellow-500 caret-yellow-800 prose prose-invert  prose-p:text-zinc-600 dark:prose-p:text-white prose-p:my-3 prose-p:leading-relaxed prose-headings:text-zinc-600 dark:prose-headings:text-white prose-headings:my-4 prose-blockquote:my-4 prose-blockquote:text-zinc-600 dark:prose-blockquote:text-white prose-ul:text-zinc-600 dark:prose-ul:text-white prose-ul:my-2 prose-li:text-zinc-600 dark:prose-li:text-white prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
    />
  )
}
