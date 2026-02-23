import Image from "next/image"
export default function ConversationView() {
  return <div className="text-3xl flex justify-center items-center  h-full opacity-45">
    <div>
      <h1 className="text-3xl text-center font-medium">
        AiBot
      </h1>
      <Image alt="logo.svg" height={50} width={50} src={'/logo.svg'} />

    </div>
  </div>
}
