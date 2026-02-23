'use client'
import { useState } from "react"
import CodeEditorLayout from "./CodeEditorLayout"
import { GithubIcon } from "@/components/GithubIcon"
import { cn } from "@/lib/utils"
type Tab = "code" | "preview"
export default function CodeView() {
  const [tab, setTab] = useState<Tab>("code")
  return (
    <div className="w-full">
      <div className="flex  p-6 items-center gap-1 h-12 bg-[#18191a] px-3 border-b border-border/60  backdrop-blur">
        <button
          type="button"
          onClick={() => setTab("code")}
          className={cn(
            "relative h-8 px-3 rounded-md text-sm font-medium transition-colors",
            tab === "code"
              ? "bg-accent text-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
          )}
        >
          Code
        </button>
        <button
          type="button"
          onClick={() => setTab("preview")}
          className={cn(
            "relative h-8 px-3 rounded-md text-sm font-medium transition-colors",
            tab === "preview"
              ? "bg-accent text-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
          )}
        >
          Preview
        </button>
        <button className={cn(
          "h-8 absolute right-10 flex items-center gap-2 px-3 rounded-md text-sm font-medium transition-colors",
          "bg-accent text-foreground"
        )}>
          <GithubIcon size={16} />
          Export
        </button>
      </div>
      <div className="">
        <div
          className={cn(
            tab === "code" ? "block" : "hidden",
            " "
          )}
        >
          <CodeEditorLayout />
        </div>
        <div
          className={cn(
            tab === "preview" ? "block" : "hidden",
            "rounded-xl border border-border/60 bg-card"
          )}
        >
          <div className="px-3 py-2 border-b border-border/60 text-xs text-muted-foreground">
            Preview
          </div>
          <div className="p-3 min-h-60">
            {/* your preview div */}
          </div>
        </div>

      </div>
    </div >
  )
}
