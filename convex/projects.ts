import { mutation } from "./_generated/server";
import verifyAuth from "./verifyAuth";
import { query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const auth = await verifyAuth(ctx);
    await ctx.db.insert("Project", { name: args.name, ownerId: auth });
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    const auth = await ctx.auth.getUserIdentity();
    if (!auth) {
      return []
    }
    const Projectget = await ctx.db.query("Project")
      .withIndex('by_owner', (q) => q.eq('ownerId', auth.subject))
      .collect();

    return Projectget
  },
});



