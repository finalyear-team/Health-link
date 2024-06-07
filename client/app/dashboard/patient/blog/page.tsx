"use client"
import { payPayment } from '@/Services/paymentService'
import useUserStore from '@/store/userStore'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Blog = () => {
  const router = useRouter()
  const [paymentUrl, setPaymentUrl] = useState("")
  const useuser = useUserStore()
  useEffect(() => {
    const pay = async () => {
      try {
        const url = await payPayment()


      } catch (error) {
        console.log(error)

      }

    }
    pay()
  }, [])

  return (
    <div className='text-3xl font-bold'>Blog page</div>
  )
}

export default Blog