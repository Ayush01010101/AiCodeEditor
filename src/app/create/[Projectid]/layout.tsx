'use client'
import Navbar from "./Navbar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useParams } from "next/navigation"
import { api } from "../../../../convex/_generated/api"
import { useQuery } from "convex/react"
import type { Id } from "../../../../convex/_generated/dataModel"
const Layout = ({ children }: { children: React.ReactNode, }) => {
  const params = useParams()
  const Projectid = params?.Projectid

  if (!Projectid || Array.isArray(Projectid)) {
    return (<>
      loading...
    </>)
  }

  const projectdata = useQuery(api.projects.getById, { id: Projectid as Id<"Project"> })
  return (
    <TooltipProvider>
      <div >
        <Navbar Updatedtime={projectdata?.updatedAt} />
        {children}
      </div>
    </TooltipProvider >
  )
}


export default Layout
