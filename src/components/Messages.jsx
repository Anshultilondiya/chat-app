import React, { useContext, useEffect } from "react";
import { ChatContext } from "../context/chatContext";
import { IoMdShare } from "react-icons/io";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
// Messeges component, responsible for displaying messages
export const Messages = () => {
  const { activeChat, getBotResponse, botIsTyping, likeDislikeMessage } =
    useContext(ChatContext);

  useEffect(() => {
    if (activeChat?.messages.length) {
      console.log(activeChat.messages[activeChat.messages.length - 1]);
      if (activeChat.messages[activeChat.messages.length - 1].role === "user") {
        getBotResponse();
      }
    }
  }, [activeChat]);

  return activeChat ? (
    <div className="message-component">
      <h3 className="heading">
        {activeChat?.name} <IoMdShare />
      </h3>

      <ul className="message-list">
        {activeChat.messages.map((el) => (
          <li className={`message auth-${el.role}`} key={el.id}>
            <span>{el.role === "user" ? "You" : "Bot"}</span>
            {el.message}

            {el.role === "bot" ? (
              <div className="message-status">
                {
                  <span className="status">
                    {el.isLiked === 2 ? (
                      <AiFillLike
                        onClick={() => likeDislikeMessage(el.id, 0)}
                      />
                    ) : (
                      <AiOutlineLike
                        onClick={() => likeDislikeMessage(el.id, 2)}
                      />
                    )}
                    {el.isLiked === 1 ? (
                      <AiFillDislike
                        onClick={() => likeDislikeMessage(el.id, 0)}
                      />
                    ) : (
                      <AiOutlineDislike
                        onClick={() => likeDislikeMessage(el.id, 1)}
                      />
                    )}
                  </span>
                }
              </div>
            ) : null}
          </li>
        ))}
        {botIsTyping && <li className="bot-message">Bot is typing...</li>}
      </ul>
    </div>
  ) : (
    <h1>Please Select or create a chat</h1>
  );
};
