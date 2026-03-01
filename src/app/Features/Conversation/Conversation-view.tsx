import ConversationInput from "./ConversationInput"
import ConversationHeader from "./Conversation-header"
export default function ConversationView() {
  return (

    <div className="h-full">
      <ConversationHeader />

      < div className="text-3xl flex flex-col justify-around items-center bg-[#212329]  h-full " >
        <h1 className="text-3xl font-bold">
        </h1>
        <div className="w-full flex items-center justify-center">

          <ConversationInput />
        </div>
      </div>
    </div>

  )
}
