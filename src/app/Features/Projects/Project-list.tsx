'use client'
import { useRouter } from "next/navigation";
import { ChevronUpIcon } from "@/components/ChevronUpIcon";
import { AlertTriangle } from "lucide-react";
import { FC } from "react";
import { GithubIcon } from "@/components/GithubIcon";
import { GlobeIcon } from "@/components/GlobeIcon";
import { LoaderIcon } from "@/components/LoaderIcon";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";

interface ProjectlistProps {
  Viewall: () => void;
}

const Projectlist: FC<ProjectlistProps> = ({ Viewall }) => {

  const partialProject = useQuery(api.projects.getPartial, { limit: 5 })
  const geticon = (status: string | undefined) => {
    if (status === undefined || status === "pending") {
      return <LoaderIcon isAnimated={false} className="animate-spin" />
    } else if (status === "Done") {
      return <GithubIcon size={20} />
    } else {
      return <AlertTriangle size={20} className="text-red-400" />
    }
  }
  const router = useRouter()
  if (!partialProject) {
    return (
      <div className="w-full space-y-6">
        <div className="h-32 bg-muted/50 animate-pulse rounded-2xl" />
        <div className="space-y-3">
          <div className="h-5 w-32 bg-muted animate-pulse rounded" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 bg-muted/30 animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    )
  }
  const mostrecent = partialProject[0]

  return (

    <div className="w-full space-y-6">
      {/* Latest Working project Card */}
      {mostrecent && (
        <div className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-card p-5 transition-all duration-500 hover:shadow-[inset_0_0_15px_rgba(0,0,0,0.05)] dark:hover:shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Latest project</span>
            </div>

            <div>
              <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300 line-clamp-1">
                {mostrecent.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                {new Date(mostrecent._creationTime).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/70">Recent</h2>
          <button
            onClick={Viewall}
            className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            View all
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {partialProject.length > 0 ? (
            partialProject.map((project, index) => (
              <div key={project._id} className="group">
                <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-accent/40 transition-all duration-200 cursor-pointer">
                  <h3
                    onClick={() => {
                      router.push(`/create/${project._id}`)
                    }}

                    className="font-medium flex items-center gap-2  text-sm group-hover:translate-x-0.5 transition-transform duration-200 line-clamp-1">
                    {geticon(project.importStatus)}
                    {project.name}
                    <ChevronUpIcon className="transform rotate-90 opacity-40" size={16} />
                  </h3>
                  <span className="text-[11px] text-muted-foreground tabular-nums">
                    {new Date(project._creationTime).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-6 text-center border border-dashed rounded-xl border-border/40 bg-muted/5">
              <p className="text-xs text-muted-foreground">No projects found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Projectlist
