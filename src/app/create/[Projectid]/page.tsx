"use client"
import { useParams } from "next/navigation"
const CreateProjectPage = () => {
  const { Projectid } = useParams<{ Projectid: string }>()
  return (
    <div>{""}</div>
  )
}

export default CreateProjectPage 
