"use client"
import { useVideo } from '@100mslive/react-sdk'
import React from 'react'

const Video = ({peer}:any) => {
    const {videoRef}=useVideo({
        trackId:peer?.videoTrack
    })
  return (
    <video className='w-full h-fit ' ref={videoRef} id="localVideo" autoPlay muted></video>
  )
}

export default Video