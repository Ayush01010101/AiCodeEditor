import { inngest } from "@/inngest/client";
import { convexclient } from "@/app/utlity/ConvexClient";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
interface eventProps {
  messageId: Id<'Message'>
}
export const messageProcessing = inngest.createFunction(
  {
    id: "messageProcessing",
    cancelOn: [
    ]
  },

  { event: "message/sent" },
  async ({ event, step }) => {
    const { messageId }: eventProps = event.data
    const key = process.env.KODA_KEY
    if (!key) {
      throw new Error("you must provide a koda key")
    }
    await step.sleep('wait for a moment', "2s")
    await step.run("message-processing", async () => {
      await convexclient.mutation(api.system.updateMessageContent, { messageid: messageId, content: "ai is thinking right now..", key })
    })
  }
)
