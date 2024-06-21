import { useRef } from "react"
import {
  ActionButtonRow,
  Content,
  DraggableTopBar,
  FloatingNoteTitle,
  MarkdownEditor,
  NotePreviewList,
  RootLayout,
  Sidebar
} from "./components"
import { ThemeProvider } from "./components/theme-provider"
const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null)
  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <DraggableTopBar />
        <RootLayout>
          <Sidebar className="p-2 ">
            <ActionButtonRow className="flex justify-between mt-1" />
            <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
          </Sidebar>
          <Content className="border-l border-l-white/20" ref={contentContainerRef}>
            <FloatingNoteTitle className="pt-1" />
            <MarkdownEditor />
          </Content>
        </RootLayout>
      </ThemeProvider>
    </>
  )
}

export default App
