'use client'
import { useMutation } from "convex/react";
import { useQuery } from "convex/react";
import { api } from '../../convex/_generated/api';
import { Button } from "@/components/ui/button";

export default function Home() {
  const projects: any = useQuery(api.projects.get);
  const create = useMutation(api.projects.create)
  return (

    <div className="flex min-h-screen items-center justify-center font-sans ">
      <Button variant={'default'} onClick={() => create({ name: "hacker" })}>
        Add new project
      </Button>
      <main className="flex min-h-screen flex-col items-center  justify-between p-24">

      </main>
    </div>
  );
}
