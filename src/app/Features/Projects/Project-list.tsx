'use client'
import { FC } from "react";
interface ProjectlistProps {
  Viewall: () => void;
}

const Projectlist: FC<ProjectlistProps> = ({ Viewall }) => {
  return (
    <div>
      <h1 className="text-2xl font-medium">Recent project</h1>
    </div>
  )
}

export default Projectlist
