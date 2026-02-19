import type { Id } from "./_generated/dataModel";
import type { MutationCtx, QueryCtx } from "./_generated/server";
import verifyAuth from "./verifyAuth";

type Ctx = QueryCtx | MutationCtx;

export const verifyProjectOwner = async (ctx: Ctx, projectId: Id<"Project">) => {
  const ownerId = await verifyAuth(ctx as QueryCtx);

  const project = await ctx.db.get(projectId);
  if (!project) {
    throw new Error("Project not found!!");
  }

  if (project.ownerId !== ownerId) {
    throw new Error("file is  not accessible!!");
  }

  return { ownerId, project };
};

export const verifyFileOwner = async (ctx: Ctx, fileId: Id<"Files">) => {
  const ownerId = await verifyAuth(ctx as QueryCtx);

  const file = await ctx.db.get(fileId);
  if (!file) {
    throw new Error("File not found!!");
  }

  const project = await ctx.db.get(file.projectId);
  if (!project) {
    throw new Error("Project not found!!");
  }

  if (project.ownerId !== ownerId) {
    throw new Error("file is  not accessible!!");
  }

  return { ownerId, project, file };
};

