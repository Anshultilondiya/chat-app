import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/chatContext";

export const Feedback = () => {
  const { msgList } = useContext(ChatContext); // getting all chats from context
  const [sortedMsgList, setSortedMsgList] = useState([]); // local state for sorted chats

  useEffect(() => {
    // sort messages by rating
    setSortedMsgList([...msgList].sort((a, b) => b.rating - a.rating));
  }, [msgList]);

  return (
    <Box>
      <h1>Feedback</h1>
      <ul>
        {sortedMsgList.map((msg) => (
          <li key={msg.id}>
            {" "}
            {/* mapping through sorted chats */}
            <p>Name: {msg.name}</p>
            <p>Rating: {msg.rating}</p>
            <p>Feedback: {msg.feedback}</p>
          </li>
        ))}
      </ul>
    </Box>
  );
};
