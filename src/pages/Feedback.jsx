import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/chatContext";
import { FaRegStar, FaStar } from "react-icons/fa";

export const Feedback = () => {
  const { msgList } = useContext(ChatContext); // getting all chats from context
  const [sortedMsgList, setSortedMsgList] = useState([]); // local state for sorted chats

  useEffect(() => {
    // sort messages by rating
    setSortedMsgList([...msgList].sort((a, b) => b.rating - a.rating));
  }, [msgList]);

  return (
    <Box className="feedback">
      <h1>Feedback</h1>
      <ul>
         <li>
            <p>Name</p>
            <p>Rating</p>
            <p>Feedback</p>
          </li>
        {sortedMsgList.map((msg) => (
          <li key={msg.id}>
            {/* mapping through sorted chats */}
            <p> {msg.name}</p>
            <p>{[1, 2, 3, 4, 5].map((item) => {
            if (item <= msg.rating) {
              return <FaStar key={item} />;
            }
            return <FaRegStar key={item} />;
          })}</p>
            <p>{msg.feedback}</p>
          </li>
        ))}
      </ul>
    </Box>
  );
};
