import { showMinimap } from "@replit/codemirror-minimap"
let create = (v: any) => {
  const dom = document.createElement('div');
  return { dom }
}

const CodeMinimap = () => {
  return showMinimap.compute(['doc'], (state) => {
    return {
      create,
      displayText: 'blocks',
      showOverlay: 'always',
      gutters: [{ 1: '#00FF00', 2: '#00FF00' }],
    }
  })

}

export default CodeMinimap

