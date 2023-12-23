import { Box } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { ChatContext } from '../context/chatContext';
import { Button, Input } from '@mui/joy';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';

export default function BasicModal(props) {
    const [value, setValue] = useState('');
    const addChat = () => {
        props.createNewChat(value);
        setValue('');
        props.handleClose();
    }
  return (<Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={props.open}
        onClose={props.handleClose}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} onClick={props.handleClose} />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '15px 10px' }}>
              <p>New Chat</p>
                  <Input placeholder="Give chat a name" onChange={(e) => setValue(e.target.value)} />
                  <Button sx={{mt: 2}} onClick={addChat}>Add</Button>
         </Box>
        </Sheet>
      </Modal>
  );
}



export const ChatSideBar = () => {
    const {createNewChat,msgList, activeChatId, setActiveChatId } = useContext(ChatContext);
     const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        createNewChat('New Chat Auto');
    },[])


  return (
      <Box className={'chat-side-bar'}>
          <BasicModal open={open} handleClose={handleClose} createNewChat={createNewChat}/>
          <Box className={'new-chat'} onClick={handleOpen}>
              <p>New Chat</p> <FaRegEdit/>
          </Box>
          <p className={'heading'}>History</p>
          <ul className={'chat-list'}>
              {msgList.map((item) => <li key={item.id} className={item.id === activeChatId ? 'active' : ''} onClick={() => setActiveChatId(item.id)} >{item.name}</li>)}
          </ul>
    </Box>
  )
}