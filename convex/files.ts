import { mutation } from "./_generated/server";
import verifyAuth from "./verifyAuth";
import { api } from "./_generated/api";
import { query } from "./_generated/server";
import { v } from "convex/values";
import { useQuery } from "convex/react";
import { Paprika } from "next/font/google";



export const getFiles = query({
  args: { projectId: v.id("Project") },
  handler: async (ctx, args) => {
    await verifyAuth(ctx);
    const project = useQuery(api.projects.getById, { id: args.projectId })
    if (!project) {
      throw new Error('Project not accessible')
    }

    return await ctx.db.query("Files").withIndex('by_ProjectId', (q) => q.eq('projectId', args.projectId)).collect();

  },
});

const getFilebyId = query({
  args: {
    id: v.id("Files")
  },
  handler: async (ctx, args) => {
    const ownerId = await verifyAuth(ctx);

    const file = await ctx.db.get("Files", args.id);

    if (!file) {
      throw new Error("File not found!!")
    }


    //check the owner is user or not
    const projectdata = useQuery(api.projects.getById, { id: file.projectId })

    if (!projectdata) {
      throw new Error("Project not found!!")
    }

    if (projectdata.ownerId !== ownerId) {
      throw new Error("file is  not accessible!!")
    }

    return file;

  },
})

export const getFolderContent = query({
  args: {
    parentId: v.optional(v.id("Files")),
    projectId: v.id('Project')
  },
  handler: async (ctx, args) {
    const ownerId = await verifyAuth(ctx)
    const projectdata = useQuery(api.projects.getById, { id: args.projectId })


    if (!projectdata) {
      throw new Error("Project not found !!");

    }
    if (projectdata._id !== ownerId) {
      throw new Error("Project not found !!");
    }

    //get the folder first and then Files
    const folder = await ctx.db.query('Files')
      .withIndex('by_ProjectId_parentId', (q) => {
        return q.eq('projectId', projectdata._id)
      }).collect()
  })




export const create = mutation({
  args: {
    name: v.string(), projectId: v.id("Project"), type: v.union(v.literal("file"), v.literal("folder")), parentId: v.optional(v.id("Files")), binaryFiles: v.optional(v.id("_storage")), content: v.optional(v.string()), updatedAt: v.number()
  },
  handler: async (ctx, args) => {
    const auth = await verifyAuth(ctx);
    if (!auth) {
      throw new Error("Not authenticated");
    }
    const project = useQuery(api.projects.getById, { id: args.projectId })
    if (!project) {
      throw new Error('Project not exits')
    }

    // const alreadyexits =

    return await ctx.db.insert("Files", {
      name: args.name,
      projectId: args.projectId,
      type: args.type,
      parentId: args.parentId,
      binaryFiles: args.binaryFiles,
      content: args.content,
      updatedAt: args.updatedAt
    });

  },
});


