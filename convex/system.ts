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

const CreateMessage = mutation({
  args: {
    ConversationId: v.id("Conversation"),
    key: v.string(),
    projectid: v.id("Project"),
    content: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant"))
  },
  handler: async (ctx, args) => {
    validatekey(args.key)
    const message = {
      conversationId: args.ConversationId,
      content: args.content,
      role: args.role,
      status: "complete" as const,
      projectid: args.projectid,
      updatedAt: Date.now(),
    };
    const messageId = await ctx.db.insert("Message", message);
    return messageId
  }


}
)
export { CreateMessage }
