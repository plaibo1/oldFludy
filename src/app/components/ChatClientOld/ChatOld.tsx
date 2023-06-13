import React, { useEffect, useState } from 'react'
import ChatInput from './ChatInput';
import Message from './Message';


export type TMessage = {
  name: string;
  message: string;
}

const Chat = () => {

  const [messagesArray, setMessagesArray] = useState<TMessage[]>([]);

  const client = new WebSocket('ws://127.0.0.1:8000');

  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected')
    }

    client.onmessage = (message) => {
      const messages = JSON.parse(message.data);
      setMessagesArray((prevMessages) => [...prevMessages, ...messages]);

      console.log(messages);
    }

  }, []);

  return (
    <div>
      {
        messagesArray?.map(msg => {
          return <Message key={msg.message} msg={msg} />
        })
      }

      <ChatInput client={client} />
    </div>
  )
}

export default Chat