"use client"
import ConversationView from '@/app/Features/Conversation/Conversation-view'
import { Group, Panel } from 'react-resizable-panels'
import CodeView from '@/app/Features/Code/Code-view'
import { Separator } from 'react-resizable-panels'


const CreateProjectPage = () => {
  return (
    <Group>
      <Panel minSize={100} maxSize={400}><ConversationView /></Panel>
      <Separator />
      <Panel><CodeView /></Panel>
    </Group >

  )
}

export default CreateProjectPage
