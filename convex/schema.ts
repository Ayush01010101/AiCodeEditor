import { defineTable, defineSchema } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
  Project: defineTable({
    name: v.string(),
    ownerId: v.string(),
    importStatus: v.optional(
      v.union(
        v.literal("Failed"),
        v.literal("Done"),
        v.literal("Pending")
      )
    )
  }).index('by_owner', ["ownerId"]),
}); 
