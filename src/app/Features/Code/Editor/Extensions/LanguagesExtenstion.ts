import { javascriptLanguage } from "@codemirror/lang-javascript";
import { jsonLanguage } from '@codemirror/lang-json'
import { htmlLanguage } from '@codemirror/lang-html'
import { cssLanguage } from "@codemirror/lang-css"
import { pythonLanguage } from '@codemirror/lang-python'
import { markdownLanguage } from '@codemirror/lang-markdown'
import { jsxLanguage } from "@codemirror/lang-javascript";
import { typescriptLanguage } from "@codemirror/lang-javascript";
import { tsxLanguage } from "@codemirror/lang-javascript";

const getLangaugeExtension = (filename: string) => {
  const extension = filename.split('.').pop()?.toLowerCase()
  console.log(extension)
  switch (extension) {
    case 'js':
      return javascriptLanguage
    case 'json':
      return jsonLanguage

    case 'jsx':
      return jsxLanguage

    case 'ts':
      return typescriptLanguage
    case 'tsx':
      return tsxLanguage

    case 'html':
      return htmlLanguage
    case 'css':
      return cssLanguage
    case 'py':
      return pythonLanguage
    case 'md':
      return markdownLanguage
    default:
      return javascriptLanguage
  }
}

export default getLangaugeExtension
