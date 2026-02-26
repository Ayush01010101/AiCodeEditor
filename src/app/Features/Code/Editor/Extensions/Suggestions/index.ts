import { StateEffect, StateField } from "@uiw/react-codemirror"
import { Decoration, EditorView, WidgetType } from "@codemirror/view";
import { selectSuggestion } from "./Selectsuggestion";
const suggestion = (filename: string) => {
  return [
    selectSuggestion()
  ]
}
export default suggestion
