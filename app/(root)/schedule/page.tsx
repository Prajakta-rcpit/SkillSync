"use client"

import { useUserRole } from '@/components/hooks/UseUserRole';
import LoaderUI from '@/components/LoaderUI';
import { useRouter } from 'next/navigation';
import React from 'react'
import InterviewScheduleUI from './InterviewScheduleUI';

const SchedulePage = () => {
  const router = useRouter();
  const {isInterviewer, isLoading} = useUserRole();

  if (isLoading) return <LoaderUI/>
  if(!isInterviewer) return router.push('/')

  return (
    <InterviewScheduleUI/>
  )
}

export default SchedulePage