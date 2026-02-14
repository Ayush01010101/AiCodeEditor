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
    ),
    exportStatus: v.optional(
      v.union(
        v.literal("Failed"),
        v.literal("Done"),
        v.literal("Pending")
      )
    ),

    exportRepoURL: v.optional(v.string()),
    updatedAt: v.number()

  }).index("by_owner_updatedAt", ["ownerId", "updatedAt"])
  ,
}); 
