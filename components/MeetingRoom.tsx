import { useCallStateHooks } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'




const MeetingRoom = () => {
  const router = useRouter();
  const [layout, setLayout] = useState<"grid" | "speaker">("speaker")
  const [showParticipants, setShowParticipants]  = useState(false)
  const {useCallCallingState} = useCallStateHooks()
  const callingState = useCallCallingState();

  return (
    <div>MeetingRoom</div>
  )
}

export default MeetingRoom