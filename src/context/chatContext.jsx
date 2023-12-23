import { nanoid } from 'nanoid';
import React, { createContext, useEffect, useState } from 'react';
import { getResponse } from '../api/ai.service';

// Step 1: Create a context
const ChatContext = createContext();


// Step 2: Create a provider component
const ContextProvider = ({ children }) => {
  
  const [msgList, setMsgList] = useState([]);

  const [activeChat, setActiveChat] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null);
  const [botIsTyping, setBotIsTyping] = useState(false);

  const createNewChat = (name) => {
    const newChat = {
      id: nanoid(),
      name: name.trim().length ? name : 'New Chat',
      messages: [],
      feedback: null,
      rating: null
    }
    setMsgList([...msgList, newChat]);
    setActiveChatId(newChat.id);
    setActiveChat(newChat);
  }

  // remove a chat
  const removeChat = (id) => {
    setMsgList(msgList.filter((chat) => chat.id !== id));
  }

  const addMessage = (message, role='user') => {
    const msgObj = {
      id: nanoid(),
      message,
      role,
      isLiked: 0, // 1 - dislike, 2 - like, 0 - neutral
    }
    setMsgList(
      msgList.map((chat) => {
        console.log(chat.id === activeChatId)
        if (chat.id === activeChatId) {
          return {
            ...chat,
            messages: [...chat.messages, msgObj],
          };
        }
        return chat;
      })
    );
  }



  const likeDislikeMessage = (id, status) => {
    setMsgList(
      msgList.map((chat) => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            messages: chat.messages.map((msg) => {
              if (msg.id === id) {
                return {
                  ...msg,
                  isLiked : status,
                };
              }
              return msg;
            }),
          };
        }
        return chat;
      })
    );
  }

  const getBotResponse = async () => {
    setBotIsTyping(true);
   getResponse().then((response) => {
     addMessage(response, 'bot');
   }).finally(() => {
     setBotIsTyping(false);
   })
  }
  
  const addFeedback = (value, rating) => {
    setMsgList(
      msgList.map((chat) => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            feedback: value,
            rating
          };
        }
        return chat;
      })
    );
  }

  useEffect(() => {
    if (activeChatId) {
      setActiveChat(msgList.find((chat) => chat.id === activeChatId));
    }
  }, [activeChatId, msgList]);


  console.log({activeChat})
  

  const contextValue = {
    msgList,
    setMsgList,
    createNewChat,
    removeChat,
    addMessage,
    activeChat,
    setActiveChat,
    activeChatId,
    setActiveChatId, 
    getBotResponse,
    botIsTyping,
    likeDislikeMessage
  }

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};


export { ContextProvider, ChatContext };