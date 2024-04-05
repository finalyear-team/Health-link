"use client"
import React, { useState } from 'react';
import { ApolloProvider, gql, useMutation } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import client from '@/graphql/apollo-client';
import Link from 'next/link';





const LOGIN_USER = gql`
  mutation login($email:String!,$password:String!) {
    login(signinInput: { UsernameOrEmail: $email, Password: $password }) {
      access_token,
      
       
    }
  }
`;

const LoginForm = () => {
  const [login, { data, loading, error }] = useMutation(LOGIN_USER);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();
    if (email && password){
    try {
      const { data } = await login({
        variables: {
          email: email,
          password: password,
        },
      });
      console.log('Login result:', data.login);
    } catch (error) {
      console.error('Login error:', error);
    }}
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-1/3'>
        <input
          type='text'
          placeholder='Email or Username'
          className='border border-gray-500 p-4 outline-none'
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          className='border border-gray-500 p-4 outline-none'
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit' className='border rounded-md'>
          Submit
        </button>
      <Link href={"/forget-password"}>forget password</Link>
      </form>
      {data &&  <div>
        <p>{data.Username}</p>


      </div>  }
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default LoginForm;
