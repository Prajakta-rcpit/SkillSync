import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import useMeetingActions from './hooks/useMeetingActions';


interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  isJoinMeeting: boolean;
}

const MeetingModel = ({isOpen, onClose, title, isJoinMeeting}: MeetingModalProps) => {
  const [meetingUrl, setMeetingUrl] = useState("")
  const {createInstantMeeting, joinMeeting} = useMeetingActions()
 
  const handleStart= ()=>{}
 
 
  return <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

      <div className='space-y-4 pt-4'>
        {isJoinMeeting && (
            <Input
              placeholder="Paste meeting link here..."
              value={meetingUrl}
              onChange={(e) => setMeetingUrl(e.target.value)}
            />
          )}

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleStart} disabled={isJoinMeeting && !meetingUrl.trim()}>
              {isJoinMeeting ? "Join Meeting" : "Start Meeting"}
            </Button>
          </div>


      </div>


    </DialogContent>
  </Dialog>
}

export default MeetingModel