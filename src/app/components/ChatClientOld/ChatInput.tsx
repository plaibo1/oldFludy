import React, { FC, useState } from 'react'

const ChatInput: FC<{client: WebSocket}> = ({ client }) => {

  const [textMessage, setTextMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState<string  | null>(null);

  const setUserData = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser(userName);
  }

  const sendMessage = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    client.send(JSON.stringify({
      message: textMessage,
      name: user
    }));

    setTextMessage('');
  }

  return (
    <div>
      {
        !user ? <div>plz login below</div> : <div>You are login as <span className='font-bold'>{user}</span></div>
      }

      {
        !user ?
        <form onSubmit={(e) => setUserData(e)} className='rounded-md p-2 shadow-md w-[400px] flex'>
          <input type="text" placeholder='log in' className='p-4 outline-none w-full' value={userName} onChange={(e) => setUserName(e.target.value)} />
          <button className='text-white bg-indigo-500 p-3 rounded-xl' type='submit'>Log in</button>
        </form>
        :
        <form onSubmit={(e) => sendMessage(e)} className='rounded-md p-2 shadow-md w-[400px] flex'>
          <input type="text" placeholder='type...' className='p-4 outline-none w-full' value={textMessage} onChange={(e) => setTextMessage(e.target.value)} />
          <button className='text-white bg-indigo-500 p-3 rounded-xl' type='submit'>send</button>
        </form>
      }
    </div>
  )
}

export default ChatInput