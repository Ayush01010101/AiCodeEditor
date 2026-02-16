"use client"
import ConversationView from '@/app/Features/Conversation/Conversation-view'
import { Group, Panel } from 'react-resizable-panels'
import CodeView from '@/app/Features/Code/Code-view'
import { Separator } from 'react-resizable-panels'


const CreateProjectPage = () => {
  return (
    <Group>
      <Panel maxSize={500} ><ConversationView /></Panel>
      <Separator />
      <div className='border-l-2 h-screen'></div>
      <Panel
      ><CodeView /></Panel>
    </Group >

  )
}

export default CreateProjectPage
