import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from 'convex/values'
import verifyAuth from "./verifyAuth";
import { verifyProjectOwner } from "./verifyOwner";


export const create = mutation({
  args: {
    name: v.string(),
    projectid: v.id('Project'),
  },
  handler: async (ctx, args) => {
    //check the auth , and proejct owner
    await verifyProjectOwner(ctx, args.projectid)
    const now = Date.now()
    const converstaionId = await ctx.db.insert("Conversation", {
      name: args.name,
      projectid: args.projectid,
      updatedAt: now,
    })
    return converstaionId;
  }


})

export const getMessages = query({
  args: {
    id: v.id("Conversation"),
  },
  handler: async (ctx, args) => {
    const converstation = await ctx.db.get(args.id)
    if (!converstation) {
      throw new Error("converstation not found !!")
    }
    await verifyProjectOwner(ctx, converstation.projectid)

    const messages = ctx.db.query("Message").withIndex("by_converstationId", (q) => q.eq("conversationId", args.id)).collect()

    return messages;

  }
})

export const getAllProjectconverstations = query({
  args: {
    projectid: v.id("Project")
  }
  , handler: async (ctx, args) => {
    await verifyProjectOwner(ctx, args.projectid)
    const converstation = await ctx.db.query("Conversation")
      .withIndex('by_projectid', ({ eq }) => eq('projectid', args.projectid))
      .collect()
    return converstation
  }
})


export const getConversationById = query({
  args: {
    id: v.id("Conversation"),
    projectId: v.id("Project")
  },
  handler: async (ctx, args) => {
    const converstation = await ctx.db.query("Conversation")
      .withIndex('by_projectid', ({ eq }) => eq("projectid", args.projectId))
      .first()

    if (!converstation) {
      throw new Error("converstation not found !!")
    }
    await verifyProjectOwner(ctx, converstation.projectid)

    return converstation;
  }
})
