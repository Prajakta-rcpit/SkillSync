import { CallingState, CallParticipantsList, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { LoaderIcon } from 'lucide-react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './ui/resizable';


const MeetingRoom = () => {
  const router = useRouter();
  const [layout, setLayout] = useState<"grid" | "speaker">("speaker")
  const [showParticipants, setShowParticipants]  = useState(false)
  const {useCallCallingState} = useCallStateHooks()
  const callingState = useCallCallingState();

  if(callingState != CallingState.JOINED){
    return (
      <div className='h-96 flex items-center justify-center'>
        <LoaderIcon className='size-6 animate-spin'/>

      </div>
    )
  }

  return (
    <ResizablePanelGroup direction='horizontal'>
      <ResizablePanel defaultSize={35} minSize={25} maxSize={100} className='relative'>
        <div className='absolute insert-0'>
        {layout ==='grid' ? <PaginatedGridLayout/>: <SpeakerLayout/>}
         {showParticipants && (
              <div className="absolute right-0 top-0 h-full w-[300px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <CallParticipantsList onClose={() => setShowParticipants(false)} />
              </div>
            )}
        </div>

        <div>
          <div>
            <div>
          </div>
          </div>
          </div>



       </ResizablePanel>
       <ResizableHandle withHandle/>

       <ResizablePanel defaultSize={65} minSize={25}>
        <h1>Code editor will go here</h1>
       </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default MeetingRoom