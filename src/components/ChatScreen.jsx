import { Box, Input, Modal, TextareaAutosize } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Messages } from "./Messages";
import { Button, ModalClose, Sheet } from "@mui/joy";
import { ChatContext } from "../context/chatContext";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function BasicModal(props) {
  const [value, setValue] = useState("");
  const [rating, setRating] = useState(0);
  const addChat = () => {
    props.addFeedback(value, rating);
    setValue("");
    props.handleClose();
  };
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={props.open}
      onClose={props.handleClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 700,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} onClick={props.handleClose} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            margin: "15px 10px",
          }}
        >
          <p>Give Feedback</p>
          {[1, 2, 3, 4, 5].map((item) => {
            if (item <= rating) {
              return <FaStar key={item} onClick={() => setRating(item)} />;
            }
            return <FaRegStar key={item} onClick={() => setRating(item)} />;
          })}
          <Input
            placeholder="Please provide feedback here"
            onChange={(e) => setValue(e.target.value)}
          />
          <Button sx={{ mt: 2 }} onClick={addChat}>
            Submit Feedback
          </Button>
        </Box>
      </Sheet>
    </Modal>
  );
}

export const ChatScreen = () => {
  const { addMessage, addFeedback, activeChat } = useContext(ChatContext);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sendMessage = () => {
    if (value) {
      addMessage(value);
      setValue("");
    }
  };

  const endConversation = () => {
    handleOpen();
  };

  return (
    <Box className="chat-screen">
      <BasicModal
        open={open}
        handleClose={handleClose}
        addFeedback={addFeedback}
      />
      <Messages />
      {activeChat?.isConversationEnded ? (
        <Box className="end-conversation-card">
          <p className="feedback"> <span>Feedback:</span>
            {activeChat.feedback}</p>
          <p className="rating">
            <span>Rating:</span>
           {activeChat.rating !== null ? [1, 2, 3, 4, 5].map((item) => {
            if (item <= activeChat.rating) {
              return <FaStar key={item} />;
            }
              else if (activeChat.rating !== null) return <FaRegStar key={item} />;
              else return null;
           }) : "not rated"}
            </p>
          <h5>Conversation Ended</h5>
        </Box>
      ) : (
        <Box className="input-container">
          <TextareaAutosize
            className="input-message"
            placeholder="Message AI Bot"
            minRows={1}
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <Button className="send-button" onClick={sendMessage}>
            Send
          </Button>
          <Button className="send-button" onClick={endConversation}>
            End Conversation
          </Button>
        </Box>
      )}
    </Box>
  );
};
