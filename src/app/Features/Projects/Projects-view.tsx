"use client"
import { GithubIcon } from "@/components/GithubIcon"
import Projectlist from "./Project-list"
import { PlusIcon } from "@/components/PlusIcon"
import { cn } from "@/lib/utils"
import { useMutation } from "convex/react"
import Image from "next/image"
import { api } from "../../../../convex/_generated/api"
import { generateUser } from "./RandomProjectDataGenerator"
import { useRouter } from "next/navigation"
const Projectview = () => {
  const createproject = useMutation(api.projects.create)
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12">
      <div className="text-center mb-12 flex flex-col items-center">
        <div className="mb-8 p-3 rounded-2xl bg-primary/5 border border-primary/10 shadow-sm animate-in fade-in zoom-in duration-500">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={64}
            height={64}
            className="w-12 h-12 md:w-16 md:h-16"
          />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Get Started
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-md">
          Choose how you want to start your next big project.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Create New Project Card */}
        <div className={cn(
          "group relative flex flex-col items-center p-10 rounded-3xl border bg-card transition-all hover:shadow-2xl hover:-translate-y-1  overflow-hidden",
          "border-border/50 hover:border-primary/50"
        )}>
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div onClick={async () => {
            const projectId = await createproject({
              name: generateUser().name
            })
            router.push(`/create/${projectId}`)
          }} className="relative cursor-pointer z-10 bg-primary/10 p-6 rounded-2xl mb-6 group-hover:bg-primary/20 transition-colors">

            <PlusIcon isAnimated={true} className="text-primary" size={48} />
          </div>
          <h2 className="relative z-10 text-2xl font-semibold mb-3">Create Project</h2>
          <p className="relative z-10 text-center text-muted-foreground">
            Start a fresh project from scratch with our boilerplate templates.
          </p>
        </div>

        {/* Import from GitHub Card */}
        <div className={cn(
          "group relative flex flex-col items-center p-10 rounded-3xl border bg-card transition-all hover:shadow-2xl hover:-translate-y-1 overflow-hidden",
          "border-border/50 hover:border-foreground/20"
        )}>
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative cursor-pointer z-10 bg-muted p-6 rounded-2xl mb-6 group-hover:bg-muted/80 transition-colors">
            <GithubIcon isAnimated={true} className="text-foreground" size={48} />
          </div>
          <h2 className="relative z-10 text-2xl font-semibold mb-3">Import from GitHub</h2>
          <p className="relative z-10 text-center text-muted-foreground">
            Connect your GitHub account and import your existing repositories.
          </p>
        </div>
      </div>
      <div className="mt-10">


        <Projectlist Viewall={() => { console.log('clicked') }} />
      </div>
    </div>
  )
}

export default Projectview

