import Navbar from "./Navbar"
import { TooltipProvider } from "@/components/ui/tooltip"
const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <TooltipProvider>


        <Navbar />
        <div>{children}</div>

      </TooltipProvider>
    </>
  )
}


export default Layout
