'use client'
import { type FC, useState, useEffect, useRef } from "react"
import Image from "next/image"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { UserButton } from "@clerk/nextjs"
import { CloudUploadIcon } from "@/components/CloudUploadIcon"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { useParams } from "next/navigation"
import type { Id } from "../../../../convex/_generated/dataModel"

const ta = require("time-ago") as { ago: (date: any, short?: boolean) => string };

const Navbar: FC<{ Updatedtime: number | undefined, ProjectName: string | undefined }> = ({ Updatedtime, ProjectName }) => {
  const params = useParams()
  const Projectid = params?.Projectid as Id<"Project"> | undefined
  const renameProject = useMutation(api.projects.rename)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(ProjectName || "")
  const inputRef = useRef<HTMLInputElement>(null)
  //
  // useEffect(() => {
  //   if (ProjectName && !isEditing) {
  //     setName(ProjectName)
  //   }
  // }, [ProjectName, isEditing])
  //
  const handleRename = async () => {
    if (!Projectid || !name.trim() || name === ProjectName) {
      setIsEditing(false)
      setName(ProjectName || "")
      return
    }

    try {
      await renameProject({ id: Projectid, name: name.trim() })
    } catch (error) {
      console.error("Failed to rename project:", error)
      setName(ProjectName || "")
    } finally {
      setIsEditing(false)
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl px-6 h-16 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5 group cursor-pointer">
          <div className="relative">
            <Image
              src="/logo.svg"
              alt="logo"
              width={30}
              height={30}
              className="transition-transform duration-500 group-hover:rotate-12"
            />
            <div className="absolute -inset-1 bg-primary/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h2 className="text-lg font-bold tracking-tight text-foreground/90 group-hover:text-foreground transition-colors">
            AicodeEditor
          </h2>
        </div>

        <Separator orientation="vertical" className="h-6 bg-border/60 mx-1" />

        <div className="flex items-center gap-3">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleRename}
              onKeyDown={(e) => e.key === "Enter" && handleRename()}
              className="bg-accent/50 border-none outline-hidden text-sm font-medium text-foreground px-2 py-1 rounded-md w-48 focus:ring-1 focus:ring-primary/30 transition-all"
              autoFocus
            />
          ) : (
            <h2
              onClick={() => ProjectName && setIsEditing(true)}
              className={cn(
                "text-sm font-medium transition-colors cursor-text hover:bg-accent/30 px-2 py-1 rounded-md",
                ProjectName ? "text-foreground/80 hover:text-foreground" : "text-muted-foreground/50 animate-pulse"
              )}
            >
              {ProjectName || "Loading project..."}
            </h2>
          )}

          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <button className="flex items-center justify-center p-1.5 rounded-md hover:bg-accent/50 transition-colors group/icon">
                <CloudUploadIcon
                  size={18}
                  className="text-muted-foreground group-hover/icon:text-primary transition-colors"
                />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="px-3 py-1.5 border border-border/50 shadow-xl">
              <p className="text-[11px] font-medium">
                {Updatedtime ? `Last saved ${ta.ago(Updatedtime)}` : "Saving changes..."}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/30 border border-border/30">
          <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-medium text-muted-foreground">Live</span>
        </div>

        <Separator orientation="vertical" className="h-6 bg-border/60 mx-1" />

        <div className="flex items-center pl-2">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-8 w-8 ring-1 ring-border/50 hover:ring-primary/50 transition-all duration-300 shadow-sm"
              }
            }}
          />
        </div>
      </div>
    </nav >
  )
}

export default Navbar
