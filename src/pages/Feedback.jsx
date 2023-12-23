import { Box } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/chatContext';

export const Feedback = () => {
    const { msgList } = useContext(ChatContext);
    const [sortedMsgList, setSortedMsgList] = useState([]);
    console.log(msgList)

    useEffect(() => {
        // sort messages by rating
        setSortedMsgList([...msgList].sort((a, b) => b.rating - a.rating));
    },[msgList])

  return (
      <Box>
          <h1>Feedback</h1>
          <ul>
              {sortedMsgList.map((msg) => (
                  <li key={msg.id}>
                      <p>Name: {msg.name}</p>
                      <p>Rating: {msg.rating}</p>
                      <p>Feedback: {msg.feedback}</p>
                  </li>
              ))}
          </ul>

      </Box>
  )
}
