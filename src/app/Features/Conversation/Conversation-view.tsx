import ConversationInput from "./ConversationInput"
import Conversation from "./Conversation"
import ConversationHeader from "./Conversation-header"
import ConverstationMessages from "./ConversationMessages"
export default function ConversationView() {
  return (

    <div className="h-full bg-[#212329] ">
      <ConversationHeader />
      < div className="text-3xl flex flex-col items-center   h-full  gap-5" >
        <h1 className="text-3xl font-bold">
        </h1>

        <div className="w-full flex items-center justify-center">
          <Conversation />
        </div>
      </div>
    </div >
  )
}
