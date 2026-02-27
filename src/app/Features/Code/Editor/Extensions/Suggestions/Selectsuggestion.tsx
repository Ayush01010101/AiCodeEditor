import { EditorView, keymap } from "@codemirror/view"
import { openInput } from "./openInput"
let activeCleanup: null | (() => void) = null
export function selectSuggestion() {
  return keymap.of([
    {
      key: "K",
      run(view) {
        const { from, to } = view.state.selection.main

        if (from === to) return true

        const selectedText = view.state.doc.sliceString(from, to)

        openInput(view, to, selectedText)

        return true
      }
    }
  ])
}

