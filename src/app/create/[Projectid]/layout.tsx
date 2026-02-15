'use client'
import Navbar from "./Navbar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useParams } from "next/navigation"
import { api } from "../../../../convex/_generated/api"
import { useQuery } from "convex/react"
import type { Id } from "../../../../convex/_generated/dataModel"
import { useEffect } from "react"
const Layout = ({ children }: { children: React.ReactNode, }) => {
  const params = useParams()
  const Projectid = params?.Projectid

  if (!Projectid) {
    return (<>
      loading...
    </>)
  }

  const projectdata = useQuery(api.projects.getById, { id: Projectid as Id<"Project"> })
  return (
    <>
      <TooltipProvider>
        <Navbar Updatedtime={projectdata?.updatedAt} />
        {children}
      </TooltipProvider>
    </>
  )
}


export default Layout
