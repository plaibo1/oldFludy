import React, { useEffect, useRef, useState } from "react";

type TMsg = {
  username: string;
  message: string;
  id: string;
  event: "message" | "connection";
};

const WebSock = () => {
  const [messagesArray, setMessagesArray] = useState<TMsg[]>([]);
  const [value, setValue] = useState("");
  const socket = useRef<WebSocket>();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");

  function connect() {
    socket.current = new WebSocket("ws://localhost:5000");

    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: "connection",
        username,
        id: Date.now(),
      };
      socket.current?.send(JSON.stringify(message));
    };

    socket.current.onmessage = (event) => {
      const messages = JSON.parse(event.data);
      setMessagesArray((prevMessages) => [...prevMessages, messages]);
    };

    socket.current.onclose = () => {
      console.log("Socket закрыт");
    };

    socket.current.onerror = () => {
      console.log("Socket произошла ошибка");
    };
  }

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.trim().length === 0) {
        return; 
    }

    const message = {
      username,
      message: value.trim(),
      id: Date.now(),
      event: "message",
    };
    socket.current?.send(JSON.stringify(message));
    setValue("");
  };

  if (!connected) {
    return (
      <div className="p-3 rounded-md overflow-hidden shadow-md inline-flex">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Введите ваше имя"
        />
        <button onClick={connect}>Войти</button>
      </div>
    );
  }

  return (
    <div className="">
      <div className="bg-slate-100 h-[330px] overflow-y-auto p-2 rounded-md mb-10 flex flex-col">
        {messagesArray.map((mess) => (
          <div key={mess.id}>
            {mess.event === "connection" ? (
              <div className="text-center my-2">
                <div className="text-sm px-2 bg-white shadow-sm inline-flex rounded-xl">
                    Пользователь {mess.username} подключился
                </div>
              </div>
            ) : (
              <div className={username === mess.username ? 'flex justify-end' : 'flex justify-start'}>
                <div className="flex">
                    {username === mess.username ? '' : 
                        <div className="w-7 h-7 font-black mr-2 bg-indigo-500 rounded-full flex justify-center items-center text-white">
                            {mess.username[0].toUpperCase()}
                        </div>
                    } 
                    <div className="rounded-lg bg-white shadow-md px-3 my-1">
                        {mess.message}
                    </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="p-3 rounded-md overflow-hidden shadow-md inline-flex">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          className="px-3 outline-none"
        />
        <button
          className="p-3 bg-indigo-500 rounded-md text-white text-sm"
        >
          Отправить
        </button>
      </form>
    </div>
  );
};

export default WebSock;
