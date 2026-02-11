import { mutation } from "./_generated/server";
import { query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const ProjectCreate = await ctx.db.insert("Project", { name: args.name, ownerId: "123TESTID" });
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    const Projectget = await ctx.db.query("Project").collect();
    return Projectget
  },
});



