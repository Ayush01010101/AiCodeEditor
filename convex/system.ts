import { mutation } from "./_generated/server";
import { query } from "./_generated/server";
import { v } from "convex/values";


function validatekey(key: string) {
  const enviromentkey = process.env.KODA_KEY;
  if (!key || !enviromentkey) {
    throw new Error("Provide a koda key");
  }
  if (key !== enviromentkey) {
    throw new Error('Invalid Key')
  }

}
export const getconversationbyid = query({
  args: {
    ConversationId: v.id("Conversation"),
    Koda_key: v.string()
  },
  handler: (ctx, args) => {
    return ctx.db.get("Conversation", args.ConversationId)
  }
})

export const CreateMessage = mutation({
  args: {
    ConversationId: v.id("Conversation"),
    key: v.string(),
    projectid: v.id("Project"),
    status: v.union(
      v.literal("complete"),
      v.literal("pending"),
      v.literal("reject"),
    ),
    content: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant"))
  },
  handler: async (ctx, args) => {
    validatekey(args.key)
    const message = {
      conversationId: args.ConversationId,
      content: args.content,
      role: args.role,
      status: args.status,
      projectid: args.projectid,
      updatedAt: Date.now(),
    };
    const messageId = await ctx.db.insert("Message", message);
    await ctx.db.patch("Conversation", args.ConversationId, { updatedAt: Date.now() })
    return messageId
  }
}
)

export const updateMessageContent = mutation({
  args: {
    messageid: v.id('Message'),
    content: v.string(),
    key: v.string()
  },
  handler: async (ctx, args) => {
    validatekey(args.key)
    const newdata = await ctx.db.patch("Message", args.messageid, { content: args.content, status: "complete" })
    return newdata
  }

})

export const getPendingMessages = query({
  args: {
    projectid: v.id("Project"),
    key: v.string(),
  },
  handler: async (ctx, args) => {
    validatekey(args.key);
    return await ctx.db
      .query("Message")
      .withIndex("by_project_status", (q) =>
        q.eq("projectid", args.projectid).eq("status", "pending"),
      )
      .collect();
  },
});


