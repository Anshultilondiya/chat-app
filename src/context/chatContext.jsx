import { nanoid } from "nanoid";
import React, { createContext, useEffect, useState } from "react";
import { getResponse } from "../api/ai.service";

// Step 1: Create a context
const ChatContext = createContext();

// Step 2: Create a provider component
const ContextProvider = ({ children }) => {
  // msgList is the main state, which is storing the data of all chats
  const [msgList, setMsgList] = useState([]);
  // activeChat is the state of the current chat
  const [activeChat, setActiveChat] = useState(null);
  // activeChatId is the id of the current chat
  const [activeChatId, setActiveChatId] = useState(null);
  // botIsTyping is the state of the bot, just to show that the bot is typing
  const [botIsTyping, setBotIsTyping] = useState(false);

  // function to create a new chat
  const createNewChat = (name) => {
    const newChat = {
      id: nanoid(),
      name: name.trim().length ? name : "New Chat",
      messages: [],
      feedback: null,
      rating: null,
      isConversationEnded: false,
    };
    setMsgList([...msgList, newChat]);
    setActiveChatId(newChat.id);
    setActiveChat(newChat);
  };

  // remove a chat
  const removeChat = (id) => {
    setMsgList(msgList.filter((chat) => chat.id !== id));
  };

  // add a message
  const addMessage = (message, role = "user") => {
    const msgObj = {
      id: nanoid(),
      message,
      role,
      isLiked: 0, // 1 - dislike, 2 - like, 0 - neutral
    };
    // add the message to the chat
    setMsgList(
      msgList.map((chat) => {
        console.log(chat.id === activeChatId);
        if (chat.id === activeChatId) {
          return {
            ...chat,
            messages: [...chat.messages, msgObj],
          };
        }
        return chat;
      })
    );
  };
  // like or dislike a message
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
                  isLiked: status,
                };
              }
              return msg;
            }),
          };
        }
        return chat;
      })
    );
  };

  // get bot response
  const getBotResponse = async () => {
    setBotIsTyping(true);
    getResponse()
      .then((response) => {
        addMessage(response, "bot");
      })
      .finally(() => {
        setBotIsTyping(false);
      });
  };

  // add feedback
  const addFeedback = (value, rating) => {
    setMsgList(
      msgList.map((chat) => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            feedback: value,
            rating,
            isConversationEnded: true,
          };
        }
        return chat;
      })
    );
  };

  // whenever the chat id changes, set the active chat to the corresponding chat
  useEffect(() => {
    if (activeChatId) {
      setActiveChat(msgList.find((chat) => chat.id === activeChatId));
    }
  }, [activeChatId, msgList]);

  console.log({ activeChat });
  // passing the values to the context
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
    likeDislikeMessage,
    addFeedback,
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};

export { ContextProvider, ChatContext };
