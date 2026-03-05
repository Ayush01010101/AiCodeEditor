import { mutation } from "./_generated/server";
import { query } from "./_generated/server";
import { v } from "convex/values";

const CreateMessage = mutation({
  args: {
    ConversationId: v.id("Conversation"),
    projectid: v.id("Project"),
    content: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant"))
  },
  handler: async (ctx, args) => {
    const message = {
      conversationId: args.ConversationId,
      content: args.content,
      role: args.role,
      status: "complete" as const,
      projectid: args.projectid,
      updatedAt: Date.now(),
    };
    return ctx.db.insert("Message", message);
  }
}
)
export { CreateMessage }
