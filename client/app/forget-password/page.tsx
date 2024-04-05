"use client"
import React, { FormEvent } from 'react'
import { forgetPassword } from '../actions/forgetpassword'
import { gql } from "@apollo/client"
const FORGET_PASSWORD=gql`
   mutation resetPassword($email:String!){
      resetPassword(resetEmail:$email){
        email

      }

   }
 `

const ForgetPasswordPage = () => {
  const forgetPassword=(e:FormEvent)=>{
    e.preventDefault()

   }


   
  return (
    <div>
        <form  onSubmit={forgetPassword}>
            <input type="text" name='email' placeholder='Enter your email ' className='border rounded-md shadow-sm border-gray-500'/>
            <button className='border bg-blue-500 rounded-lg text-center'>Next</button>
        </form>
    </div>
  )
}

export default ForgetPasswordPage