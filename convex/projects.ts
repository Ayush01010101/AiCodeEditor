import { mutation } from "./_generated/server";
import verifyAuth from "./verifyAuth";
import { query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const auth = await verifyAuth(ctx);
    const createdproject = await ctx.db.insert("Project", { name: args.name, ownerId: auth, updatedAt: Date.now() });
    return createdproject
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    const auth = await verifyAuth(ctx);
    if (!auth) {
      return []
    }
    const Projectget = await ctx.db.query("Project")
      .withIndex('by_owner_updatedAt', (q) => q.eq('ownerId', auth))
      .collect();

    return Projectget
  },
});


export const getPartial = query({
  args: {
    limit: v.number()
  },
  handler: async (ctx, { limit }) => {
    const auth = await verifyAuth(ctx);
    if (!auth) {
      return []
    }
    const Projectget = await ctx.db.query("Project")
      .withIndex('by_owner_updatedAt', (q) => q.eq('ownerId', auth))
      .order('desc')
      .take(limit);
    return Projectget
  },
});

