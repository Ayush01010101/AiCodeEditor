"use client"
import { GithubIcon } from "@/components/GithubIcon"
import Projectlist from "./Project-list"
import { PlusIcon } from "@/components/PlusIcon"
import { cn } from "@/lib/utils"
import { useMutation, useQuery } from "convex/react"
import Image from "next/image"
import { api } from "../../../../convex/_generated/api"
import { generateUser } from "./RandomProjectDataGenerator"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { Search, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const Projectview = () => {
  const createproject = useMutation(api.projects.create)
  const getprojects = useQuery(api.projects.getPartial, { limit: 15 })
  const [ViewAllProjects, setViewAllProjects] = useState<boolean>(false)
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4 py-8 max-w-6xl mx-auto w-full relative">
      <div className="w-full flex flex-col lg:flex-row gap-8 items-start">

        {/* Left Side: Header and Actions */}
        <div className="flex flex-col w-full lg:w-3/5 space-y-8">
          <div className="flex flex-col items-start text-left">
            <div className="mb-6 p-2.5 rounded-xl bg-primary/5 border border-primary/10 shadow-sm animate-in fade-in zoom-in duration-500">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={48}
                height={48}
                className="w-10 h-10"
              />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Get Started
            </h1>
            <p className="mt-2 text-base text-muted-foreground max-w-md">
              Start a new project or continue where you left off.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {/* Create New Project Card */}
            <div className={cn(
              "group relative flex flex-col items-start p-6 rounded-2xl border bg-card transition-all hover:shadow-lg hover:-translate-y-0.5 overflow-hidden",
              "border-border/50 hover:border-primary/40"
            )}>
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div onClick={async () => {
                const projectId = await createproject({
                  name: generateUser().name
                })
                router.push(`/create/${projectId}`)
              }} className="relative cursor-pointer z-10 bg-primary/10 p-4 rounded-xl mb-4 group-hover:bg-primary/20 transition-colors">
                <PlusIcon isAnimated={true} className="text-primary" size={32} />
              </div>
              <h2 className="relative z-10 text-lg font-semibold mb-1.5">Create Project</h2>
              <p className="relative z-10 text-sm text-muted-foreground leading-relaxed">
                Start a fresh project from scratch with our templates.
              </p>
            </div>

            {/* Import from GitHub Card */}
            <div className={cn(
              "group relative flex flex-col items-start p-6 rounded-2xl border bg-card transition-all hover:shadow-lg hover:-translate-y-0.5 overflow-hidden",
              "border-border/50 hover:border-foreground/15"
            )}>
              <div className="absolute inset-0 bg-linear-to-br from-foreground/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative cursor-pointer z-10 bg-muted p-4 rounded-xl mb-4 group-hover:bg-muted/80 transition-colors">
                <GithubIcon isAnimated={true} className="text-foreground" size={32} />
              </div>
              <h2 className="relative z-10 text-lg font-semibold mb-1.5">Import from GitHub</h2>
              <p className="relative z-10 text-sm text-muted-foreground leading-relaxed">
                Connect your GitHub and import repositories.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Project List */}
        <div className="w-full lg:w-2/5 mt-4 lg:mt-0 pt-2 lg:border-l lg:pl-8 border-border/40">
          <Projectlist Viewall={() => setViewAllProjects(true)} />
        </div>
      </div>

      {/* View All Projects Modal */}
      <AnimatePresence>
        {ViewAllProjects && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewAllProjects(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-card border border-border shadow-2xl rounded-3xl w-full max-w-2xl overflow-hidden"
              >
                <div className="p-6 border-b border-border flex justify-between items-center">
                  <h2 className="text-2xl font-bold tracking-tight">All Projects</h2>
                  <button
                    onClick={() => setViewAllProjects(false)}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Search Bar UI */}
                  <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" size={18} />
                    <input
                      type="text"
                      placeholder="Search your projects..."
                      className="w-full bg-muted/50 border border-border/50 rounded-xl py-3 pl-10 pr-4 outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    />
                  </div>

                  {/* Projects List */}
                  <div className="max-h-[400px] overflow-y-auto pr-2 space-y-1 custom-scrollbar">
                    {getprojects ? (
                      getprojects.length > 0 ? (
                        getprojects.map((project, index) => (
                          <div key={project._id} className="group">
                            <div className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-accent/40 transition-all cursor-pointer">
                              <div className="flex flex-col">
                                <span className="font-semibold text-base group-hover:text-primary transition-colors">
                                  {project.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(project._creationTime).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </span>
                              </div>
                              <div className="h-8 w-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <PlusIcon className="text-primary" size={16} />
                              </div>
                            </div>
                            {index < getprojects.length - 1 && (
                              <Separator className="bg-border/30 mx-4" />
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="py-20 text-center text-muted-foreground">
                          No projects found.
                        </div>
                      )
                    ) : (
                      <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="h-14 w-full bg-muted/40 animate-pulse rounded-xl" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Projectview

