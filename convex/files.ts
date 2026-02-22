import { mutation } from "./_generated/server";
import verifyAuth from "./verifyAuth";
import { verifyFileOwner } from "./verifyOwner";
import { query } from "./_generated/server";
import { v } from "convex/values";

const getFiles = query({
  args: { projectId: v.id("Project") },
  handler: async (ctx, args) => {
    const ownerId = await verifyAuth(ctx);
    const project = await ctx.db.get(args.projectId)
    if (!project) {
      throw new Error('Project not accessible')
    }
    if (project.ownerId !== ownerId) {
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
    const file = await verifyFileOwner(ctx, args.id);
    return file.file;
  }
})


const getFolderContent = query({
  args: {
    parentId: v.optional(v.id("Files")),
    projectId: v.id('Project')
  },
  handler: async (ctx, args) => {
    const ownerId = await verifyAuth(ctx)
    const projectdata = await ctx.db.get("Project", args.projectId);
    if (!projectdata) {
      throw new Error("Project not found !!");
    }
    if (projectdata.ownerId !== ownerId) {
      throw new Error("ownership not found !!");
    }
    if (!args.parentId) {
      const files = await ctx.db.query("Files").withIndex('by_ProjectId', (q) => q.eq('projectId', args.projectId)).collect();
      return files
    }
    // get the folder first and then Files
    const files = await ctx.db.query("Files").withIndex('by_ProjectId_parentId', (q) => q.eq('projectId', args.projectId).eq('parentId', args.parentId)).collect();
    return files
  }
})


const create = mutation({
  args: {
    name: v.string(), projectId: v.id("Project"), type: v.union(v.literal("file"), v.literal("folder")), parentId: v.optional(v.id("Files")), binaryFiles: v.optional(v.id("_storage")), content: v.optional(v.string()), updatedAt: v.number()
  },
  handler: async (ctx, args) => {
    console.log('parentid', args.parentId)
    const ownerid = await verifyAuth(ctx);
    const project = await ctx.db.get("Project", args.projectId);
    if (!project) {
      throw new Error('Project not exits')
    }
    if (project.ownerId !== ownerid) {
      throw new Error("Unauthorized access of  project")
    }


    if (args.parentId) {
      console.log('in parent id')
      const findfile = await ctx.db.query('Files')
        .withIndex("by_ProjectId_parentId_name", (q) =>
          q.eq("projectId", args.projectId)
            .eq("parentId", args.parentId)
            .eq("name", args.name)
        )
        .first()
      if (findfile) {
        console.log(findfile)
        throw new Error("File already exits")
      }
    } else {
      console.log('in without parent id')
      const findfile = await ctx.db.query('Files')

        .withIndex('by_ProjectId_name',
          (q) => q.eq('projectId', args.projectId)
            .eq('name', args.name)
        )
        .first()

      console.log('findfile', findfile)
      if (findfile) {
        throw new Error("File already exits")

      }
    }
    return await ctx.db.insert("Files", {
      name: args.name,
      projectId: args.projectId,
      type: args.type,
      parentId: args.parentId ? args.parentId : undefined,
      binaryFiles: args.binaryFiles,
      content: args.content,
      updatedAt: args.updatedAt
    }

    );

  },
});



const rename = mutation({
  args: {
    name: v.string(),
    id: v.id('Files')
  },
  handler: async (ctx, args) => {
    const { file } = await verifyFileOwner(ctx, args.id);

    const fileExists = await ctx.db.query('Files')
      .withIndex("by_ProjectId_parentId_name", (q) =>
        q.eq('projectId', file.projectId)
          .eq('parentId', file.parentId)
          .eq('name', args.name)
      )
      .first()

    if (fileExists && fileExists._id !== file._id) {
      throw new Error("File name already exits !!")
    }

    return await ctx.db.patch("Files", args.id, { name: args.name })




  },
});



const updateFileContent = mutation({
  args: {
    id: v.id('Files'),
    content: v.string()
  },
  handler: async (ctx, args) => {
    await verifyFileOwner(ctx, args.id);
    await ctx.db.patch("Files", args.id, { content: args.content, updatedAt: Date.now() });

  },
});


const deleteFile = mutation({
  args: {
    id: v.id("Files"),
  },
  handler: async (ctx, args) => {
    const { file } = await verifyFileOwner(ctx, args.id);

    const stack = [file._id];
    const idsToDelete: typeof stack = [];

    while (stack.length > 0) {
      const currentId = stack.pop();
      if (!currentId) {
        continue;
      }

      idsToDelete.push(currentId);

      const children = await ctx.db
        .query("Files")
        .withIndex("by_parentId", (q) => q.eq("parentId", currentId))
        .collect();

      for (const child of children) {
        stack.push(child._id);
      }
    }

    for (const fileId of idsToDelete.reverse()) {
      await ctx.db.delete(fileId);
    }

    return { deletedCount: idsToDelete.length };
  },
});


export {
  create,
  rename,
  deleteFile,
  updateFileContent,
  getFiles,
  getFilebyId,
  getFolderContent
}
