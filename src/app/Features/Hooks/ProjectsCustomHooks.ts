import { useMutation } from "convex/react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useCreateProject = (name: string) => {
  const createProject = useMutation(api.projects.create);
  const project = createProject({ name })


  return {
    project
  };

};

export const useGetProjects = () => {
  const getProjects = useQuery(api.projects.get);

  return {
    getProjects
  };

}

export const useGetPartialProjects = (limit: number) => {
  const getProjects = useQuery(api.projects.getPartial, { limit });
  return getProjects
}
