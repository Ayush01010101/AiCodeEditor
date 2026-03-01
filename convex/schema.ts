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

  Files: defineTable({
    name: v.string(),
    projectId: v.id("Project"),
    type: v.union(v.literal("folder"), v.literal("file")),
    parentId: v.optional(v.id('Files')),
    content: v.optional(v.string()),
    binaryFiles: v.optional(v.id("_storage")),
    updatedAt: v.number()
  }).index("by_Projectname", ['name'])
    .index("by_ProjectId", ["projectId"])
    .index("by_parentId", ["parentId"])
    .index('by_ProjectId_name', ['projectId', 'name'])
    .index('by_ProjectId_parentId', ['projectId', 'parentId'])
    .index("by_ProjectId_parentId_name", [
      "projectId",
      "parentId",
      "name"
    ]),


  Conversation: defineTable({
    projectid: v.id('Project'),
    name: v.string(),
    updatedAt: v.number()

  }).index('by_projectid', ['projectid']),



  Message: defineTable({
    conversationId: v.id('Conversation'),
    projectid: v.id('Project'),
    role: v.union(v.literal("user"), v.literal("assistant")),
    status: v.union(
      v.literal("complete"),
      v.literal("pending"),
      v.literal("reject"),

    ),
    content: v.string(),
    updatedAt: v.number()
  }).index('by_converstationId', ['conversationId'])
    .index("by_project_status", ['projectid', 'status'])
  ,

});
