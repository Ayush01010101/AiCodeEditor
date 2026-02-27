import { EditorView } from "@uiw/react-codemirror"
import fetcher from "./fetcher"
let activeCleanup: null | (() => void) = null
export function openInput(view: EditorView, to: number, selectedText: string) {
  activeCleanup?.()
  for (const el of document.querySelectorAll('[data-select-suggestion-panel="true"]')) {
    el.remove()
  }
  const abortController = new AbortController()
  const panel = document.createElement("div")
  panel.dataset.selectSuggestionPanel = "true"
  panel.style.position = "fixed"
  panel.style.zIndex = "1000"
  panel.style.padding = "12px"
  panel.style.borderRadius = "12px"
  panel.style.backgroundColor = "var(--color-popover)"
  panel.style.color = "var(--color-popover-foreground)"
  panel.style.border = "1px solid var(--color-border)"
  panel.style.boxShadow = "0 16px 40px rgba(0, 0, 0, 0.35)"
  panel.style.display = "flex"
  panel.style.flexDirection = "column"
  panel.style.gap = "10px"
  panel.style.minWidth = "320px"
  panel.style.maxWidth = "min(520px, calc(100vw - 24px))"

  const input = document.createElement("input")
  input.placeholder = "Type something..."
  input.style.width = "100%"
  input.style.boxSizing = "border-box"
  input.style.borderRadius = "10px"
  input.style.backgroundColor = "var(--color-background)"
  input.style.color = "var(--color-foreground)"
  input.style.border = "1px solid var(--color-border)"
  input.style.outline = "none"
  input.style.padding = "12px 12px"

  const actions = document.createElement("div")
  actions.style.display = "flex"
  actions.style.justifyContent = "flex-end"
  actions.style.gap = "8px"

  const cancelBtn = document.createElement("button")
  cancelBtn.type = "button"
  cancelBtn.textContent = "Cancel"

  const confirmBtn = document.createElement("button")
  confirmBtn.type = "button"
  confirmBtn.textContent = "Confirm"

  const styleButton = (btn: HTMLButtonElement, variant: "secondary" | "primary") => {
    btn.style.borderRadius = "10px"
    btn.style.padding = "10px 12px"
    btn.style.border = "1px solid var(--color-border)"
    btn.style.fontSize = "13px"
    btn.style.lineHeight = "1"
    btn.style.transition = "transform 120ms ease, background-color 120ms ease"
    btn.style.userSelect = "none"

    if (variant === "primary") {
      btn.style.backgroundColor = "var(--color-primary)"
      btn.style.color = "var(--color-primary-foreground)"
    } else {
      btn.style.backgroundColor = "var(--color-secondary)"
      btn.style.color = "var(--color-secondary-foreground)"
    }

    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "translateY(-1px)"
      btn.style.backgroundColor = "var(--color-accent)"
      btn.style.color = "var(--color-accent-foreground)"
    })
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translateY(0px)"
      if (variant === "primary") {
        btn.style.backgroundColor = "var(--color-primary)"
        btn.style.color = "var(--color-primary-foreground)"
      } else {
        btn.style.backgroundColor = "var(--color-secondary)"
        btn.style.color = "var(--color-secondary-foreground)"
      }
    })
  }

  styleButton(cancelBtn, "secondary")
  styleButton(confirmBtn, "primary")

  actions.appendChild(cancelBtn)
  actions.appendChild(confirmBtn)
  panel.appendChild(input)
  panel.appendChild(actions)

  const cleanup = () => {
    abortController.abort()
    panel.remove()
    if (activeCleanup === cleanup) activeCleanup = null
  }

  activeCleanup = cleanup

  const confirm = (inputvalue: string) => {
    fetcher({ fullcode: view.state.doc.toString(), selectedCode: selectedText, userprompt: inputvalue })
    cleanup()
  }

  const cancel = () => {
    cleanup()
  }

  const onOutsidePointerDown = (e: PointerEvent) => {
    if (!panel.contains(e.target as Node)) cancel()
  }

  const coords = view.coordsAtPos(to)
  const baseLeft = coords?.left ?? 12
  const baseTop = (coords?.bottom ?? 12) + 8
  panel.style.left = baseLeft + "px"
  panel.style.top = baseTop + "px"

  document.body.appendChild(panel)
  requestAnimationFrame(() => {
    const rect = panel.getBoundingClientRect()
    const padding = 12

    let nextLeft = rect.left
    let nextTop = rect.top

    if (rect.right > window.innerWidth - padding) {
      nextLeft = rect.left - (rect.right - (window.innerWidth - padding))
    }
    if (rect.bottom > window.innerHeight - padding) {
      nextTop = rect.top - (rect.bottom - (window.innerHeight - padding))
    }

    nextLeft = Math.max(padding, nextLeft)
    nextTop = Math.max(padding, nextTop)

    panel.style.left = nextLeft + "px"
    panel.style.top = nextTop + "px"
  })
  input.focus()

  document.addEventListener("pointerdown", onOutsidePointerDown, {
    capture: true,
    signal: abortController.signal
  })

  cancelBtn.addEventListener("click", cancel, { signal: abortController.signal })
  confirmBtn.addEventListener("click", confirm, { signal: abortController.signal })

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault()

      confirm(input.value)
      return
    }
    if (e.key === "Escape") {
      e.preventDefault()
      cancel()
    }
  }, { signal: abortController.signal })
}
