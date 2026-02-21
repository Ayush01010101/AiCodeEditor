import { mutation } from "./_generated/server";
import verifyAuth from "./verifyAuth";
import { verifyFileOwner } from "./verifyOwner";
import { api } from "./_generated/api";
import { query } from "./_generated/server";
import { v } from "convex/values";
import { useQuery } from "convex/react";

const getFiles = query({
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
    console.log("Projectdata", projectdata)
    if (!projectdata) {
      throw new Error("Project not found !!");
    }
    // if (projectdata._id !== ownerId) {
    //   throw new Error("ownership not found !!");
    // }
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
    console.log(args.parentId)
    const ownerid = await verifyAuth(ctx);
    const project = await ctx.db.get("Project", args.projectId);
    if (!project) {
      throw new Error('Project not exits')
    }
    if (project.ownerId !== ownerid) {
      throw new Error("Unauthorized access of  project")
    }


    if (args.parentId) {
      const findfile = await ctx.db.query('Files')
        .withIndex('by_ProjectId_parentId', (q) => q.eq('projectId', args.projectId)
          .eq('parentId', args.parentId))
        .filter((q) => q.eq(q.field("name"), args.name))
        .first()
      if (findfile) {
        console.log(findfile)
        throw new Error("File already exits")
      }


    } else {
      const findfile = ctx.db.query('Files')
        .withIndex('by_Projectname',
          (q) => q.eq('name', args.name)
        ).first()
      if (findfile) {
        console.log(findfile)
        throw new Error("File already exits")
      }
    }
    if (args.type === 'file') {
      return await ctx.db.insert("Files", {
        name: args.name,
        projectId: args.projectId,
        type: args.type,
        binaryFiles: args.binaryFiles,
        content: args.content,
        updatedAt: args.updatedAt
      }
      );
    }

    return await ctx.db.insert("Files", {
      name: args.name,
      projectId: args.projectId,
      type: args.type,
      parentId: args.parentId,
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
    const ownerid = await verifyAuth(ctx);
    const file = await ctx.db.get("Files", args.id);

    if (!file) {
      throw new Error("File not found !!")
    }

    const projectdata = useQuery(api.projects.getById, { id: file.projectId })
    if (!projectdata) {
      throw new Error('Project not exits')
    }
    if (projectdata._id !== ownerid) {
      throw new Error("Unauthorized access of  project")
    }

    //check the same name file exits or not 
    if (file.parentId) {
      const fileExists = await ctx.db.query('Files')
        .withIndex("by_parentId", (q) => q.eq('parentId', file.parentId))
        .filter((q) => q.eq(q.field("name"), args.name))
        .first()

      if (fileExists) {
        console.log(fileExists)
        throw new Error("File name already exits !!")
      } else {
        return await ctx.db.patch("Files", args.id, { name: args.name })
      }
    } else {
      const fileExists = await ctx.db.query('Files')
        .withIndex("by_id", (q) => q.eq('_id', args.id))
        .filter((q) => q.eq(q.field("name"), args.name))
        .first()

      if (fileExists) {
        console.log(fileExists)
        throw new Error("File name already exits !!")
      } else {
        return await ctx.db.patch("Files", args.id, { name: args.name })
      }

    }




  },
});



const updateFileContent = mutation({
  args: {
    id: v.id('Files'),
    content: v.string()
  },
  handler: async (ctx, args) => {

    const file = await verifyFileOwner(ctx, args.id);
    await ctx.db.patch("Files", args.id, { content: args.content, updatedAt: Date.now() });

  },
});


export {
  create,
  rename,
  updateFileContent,
  getFiles,
  getFilebyId,
  getFolderContent

}


