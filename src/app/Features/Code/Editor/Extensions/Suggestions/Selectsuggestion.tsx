import { EditorView, keymap } from "@codemirror/view"
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

function openInput(view: EditorView, to: number, selectedText: string) {
  const panel = document.createElement("div")
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

  actions.appendChild(cancelBtn)
  panel.appendChild(input)
  panel.appendChild(actions)

  const cleanup = () => {
    document.removeEventListener("pointerdown", onOutsidePointerDown, true)
    panel.remove()
  }


  const cancel = () => {
    cleanup()
  }

  const onOutsidePointerDown = (e: PointerEvent) => {
    if (!panel.contains(e.target as Node)) cancel()
  }

  // selection ke end position ka coords
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

  document.addEventListener("pointerdown", onOutsidePointerDown, true)

  cancelBtn.addEventListener("click", cancel)

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      return
    }
    if (e.key === "Escape") {
      e.preventDefault()
      cancel()
    }
  })
}
