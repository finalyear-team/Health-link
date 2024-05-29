"use client"
import client from '@/graphql/apollo-client'
import React from 'react'
import { HMSRoomProvider } from "@100mslive/react-sdk";

const VideoChatProvider = ({children}:any) => {
  return (
    <HMSRoomProvider>
        {children}
    </HMSRoomProvider>
  )
}

export default VideoChatProvider



