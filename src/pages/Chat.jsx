import { Grid } from "@mui/material";
import React from "react";
import { ChatSideBar } from "../components/ChatSideBar";
import { ChatScreen } from "../components/ChatScreen";

export const ChatPage = () => {
  return (
    <Grid className="chat-page" container>
      {/* Grid item for the chat sidebar (assuming a responsive layout) */}
      <Grid item lg={3} md={3} sm={3}>
        <ChatSideBar />
      </Grid>
      {/* Grid item for the chat screen (assuming a responsive layout) */}
      <Grid item lg={9} md={9} sm={9}>
        <ChatScreen />
      </Grid>
    </Grid>
  );
};
