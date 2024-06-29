"use client"
import { tokenProvider } from '@/Services/streamChatServices';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  useCreateChatClient,
  ChannelListProps,
  useChatContext,
  useChannelListContext,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';


const apiKey = process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEY as string

const ChatPage = () => {
  const channel = useChannelListContext()

  const [client, setClient] = useState<StreamChat>()
  const { user } = useUser()
  const [token, setToken] = useState()
  const [filters, setFilter] = useState({ members: {}, type: "" })

  const options = { presence: true, state: true };
  const sort = { last_message_at: -1 };

  console.log(user)
  useEffect(() => {
    const getToken = async () => {
      if (!user)
        return
      const token = await tokenProvider()
      console.log(token)
      setToken(token)
    }
    getToken()

  }, [user])
  useEffect(() => {
    const createClient = async () => {
      if (!token || !user)
        return
      const client = StreamChat.getInstance(apiKey);
      client.connectUser(
        {
          id: user?.id,
          name: user?.fullName as string
        },
        token
      );

      setFilter({ members: { $in: [user.id] }, type: 'messaging' });

      setClient(client);

      return () => client.disconnectUser();
    }

    createClient()
  }, [token])


  if (!client) return <div>Loading...</div>;

  return (
    <Chat client={client}>
      <ChannelList sort={sort as any} filters={filters as any} options={options} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
}

export default ChatPage