"use client"
import { signout } from '@/Services/authService'
import client from '@/graphql/apollo-client'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const signoutPage = () => {
    const router = useRouter()
    useEffect(() => {
        const signOutHandler = async () => {
            try {
                const signoutUser = await signout()
                if (signoutUser) {
                    router.push("/sign-in")
                    client.resetStore()
                }
            } catch (error) {

                console.log(error)
            }
        }
        signOutHandler()
    }, [])
    return (
        <div><Loader /></div>
    )
}

export default signoutPage