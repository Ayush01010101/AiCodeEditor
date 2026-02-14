'use client'
import { FC } from "react";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Separator } from "@/components/ui/separator";

interface ProjectlistProps {
  Viewall: () => void;
}

const Projectlist: FC<ProjectlistProps> = ({ Viewall }) => {
  const partialProject = useQuery(api.projects.getPartial, { limit: 5 })
  if (!partialProject) return <div>Loading...</div>
  const [mostrecent] = partialProject
  console.log(mostrecent)
  return (
    <div className="w-[20vw]  mx-auto space-y-4">
      <div className="flex justify-between items-center mb-6 px-1">
        <h2 className="text-xl font-semibold tracking-tight">Recent projects</h2>
        <button
          onClick={Viewall}
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
        >
          View all
        </button>
      </div>

      <div className="flex flex-col">
        {partialProject ? (
          partialProject.length > 0 ? (
            partialProject.map((project, index) => (
              <div key={project._id} className="group">
                <div className="flex items-center justify-between py-3 px-1 rounded-md hover:bg-accent/40 transition-all duration-200 cursor-pointer">
                  <h3 className="font-medium text-[15px] group-hover:translate-x-1 transition-transform duration-200">
                    {project.name}
                  </h3>
                  <span className="text-sm text-muted-foreground tabular-nums">
                    {new Date(project._creationTime).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                {index < partialProject.length - 1 && (
                  <Separator className="bg-border/50" />
                )}
              </div>
            ))
          ) : (
            <div className="py-8 text-center border border-dashed rounded-lg border-border/60">
              <p className="text-sm text-muted-foreground">No recent projects</p>
            </div>
          )
        ) : (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between items-center py-3">
                <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                <div className="h-4 w-20 bg-muted animate-pulse rounded" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Projectlist
