"use client"
import { gql } from '@apollo/client'
import React, { FormEvent, useState } from 'react'
import {z} from "zod"

const resetPasswordSchema=z.object({
  newPassword:z.string().min(1),
  confirmPassword:z.string().min(1)
}).refine(({newPassword,confirmPassword})=>{
  if(confirmPassword===newPassword)
     return true
})

const LOGIN_USER = gql`
  mutation resetPassword($newPassword:String!) {
    login(signinInput: { newPassword: $newPassword }) {
      UserID,Email
      
       
    }
  }
`;

const NewPage = () => {
  const [input,setInput]=useState({
    newPassword:"",
    confirmPassword:""
  })

  const submitHandler=(e:FormEvent)=>{
    e.preventDefault()
    resetPasswordSchema.parse(input)


  }
  return (
    <div>
      <form action="">
        <input type="text" placeholder='new Password'/>
      </form>
    </div>
  )
}

export default NewPage