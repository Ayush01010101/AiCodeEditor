"use client"
import { useParams } from "next/navigation"
const CreateProjectPage = () => {
  const { Projectid } = useParams<{ Projectid: string }>()
  return (
    <div>{Projectid}</div>
  )
}

export default CreateProjectPage 
