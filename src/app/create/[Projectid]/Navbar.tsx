'use client'
import type { FC } from "react"
import Image from "next/image"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { UserButton } from "@clerk/nextjs"
import { CloudUploadIcon } from "@/components/CloudUploadIcon"
const ta = require("time-ago") as { ago: (date: any, short?: boolean) => string };
const Navbar: FC<{ Updatedtime: number | undefined }> = ({ Updatedtime }) => {



  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 py-3 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center gap-2 font-bold  transition-opacity cursor-pointer group">
        <Image
          src="/logo.svg"
          alt="logo"
          width={32}
          height={32}
          className=" transition-transform duration-300"
        />
        <h2 className="text-xl tracking-tight">AicodeEditor</h2>
        <Tooltip >
          <TooltipTrigger className="flex items-center">

            <CloudUploadIcon size={24} className="text-muted-foreground transition-colors" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">{Updatedtime ? ta.ago(Updatedtime) : "Loading..."}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex gap-4 items-center">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-8 w-8 hover:ring-2 hover:ring-primary/50 transition-all"
            }
          }}
        />
      </div>
    </nav>
  )
}

export default Navbar
