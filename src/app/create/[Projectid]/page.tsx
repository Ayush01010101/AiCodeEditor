"use client"
import ConversationView from '@/app/Features/Conversation/Conversation-view'
import { Group, Panel } from 'react-resizable-panels'
import { Separator } from 'react-resizable-panels'
import CodeView from '@/app/Features/Code/FileExplorer/Code-view'
import FileTrayView from '@/app/Features/Code/FileExplorer/File-tray-view'
import Filetrayheader from '@/app/Features/Code/FileExplorer/File-tray-header'

const CreateProjectPage = () => {
  return (
    <Group>
      <Panel maxSize={350} ><ConversationView /></Panel>
      <Separator />
      <div className='border-l-2 h-screen'></div>
      <Panel
      >
        <Group>
          <Panel maxSize={250}>
            <FileTrayView />
          </Panel>
          <div className='border-l-2 h-screen'></div>
          <Panel><CodeView /></Panel>


        </Group>


      </Panel>
    </Group >

  )
}

export default CreateProjectPage
