import React, { FC } from 'react'
import { TMessage } from './ChatOld'

const Message: FC<{msg: TMessage}> = ({ msg }) => {
  return (
    <div key={msg.message} className='flex items-start my-3'>
      <div className='rounded-full flex w-10 h-10 bg-indigo-500 font-black text-2xl mr-3 text-white'>
        <span className='m-auto'>{msg.name[0].toUpperCase()}</span>
      </div>

      <div className='bg-slate-100 w-[300px] p-3 rounded-lg'>
        {msg.message}
      </div>
    </div>
  )
}

export default Message