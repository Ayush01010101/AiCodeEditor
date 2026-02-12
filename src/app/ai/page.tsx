"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
export default function Page() {
  const [loading, setloading] = useState<boolean>(false)

  return (

    < div className="" >
      {loading ? <p>loading</p> : <p>not loading</p>}
      <Button className="text-2xl p-3 m-4" disabled={loading} onClick={async () => {
        setloading(true)
        const response = await fetch('/api/ai/gemini', { method: 'POST' })

      }}>{loading ? 'Registering...' : 'background task'}</Button>
    </div >
  )
}
