import { QueryCtx } from "./_generated/server";

const verifyAuth = async (ctx: QueryCtx) => {
  const auth = await ctx.auth.getUserIdentity();
  if (!auth) {
    throw new Error("Not authenticated");
  }

  return auth.subject
}
export default verifyAuth
