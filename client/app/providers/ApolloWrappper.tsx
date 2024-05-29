"use client"
import client from '@/graphql/apollo-client'
import { ApolloProvider } from '@apollo/client'
import React from 'react'

const ApolloWrappper = ({children}:any) => {
  console.log(client)
  return (
    <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
  )
}

export default ApolloWrappper



