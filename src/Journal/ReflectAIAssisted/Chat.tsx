import { Send } from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";
import React from "react";
import RTE from "../RTE/RTE";
import { messagesType, queryType, reflectChatAPI } from "./reflectChatAPI";

const sample_messages = [
  {
    role: "assistant",
    content: "How was your day today? Did something exciting happen?",
  },
  {
    role: "user",
    content: "I am good, how are you?",
  },
  {
    role: "assistant",
    content: "I am good, thanks for asking.",
  },
] as messagesType;

const DisplayMessage = (message: messagesType[0]) => {
  return (
    <Box
      sx={{
        pl: { xs: 0, md: 1 },
        pr: { xs: 0, md: 1 },
        borderRadius: 4,

        backgroundColor: {
          xs: "surfaceVariant.main",
          sm: "surface.main",
        },
        color: {
          xs: "surfaceVariant.contrastText",
          sm: "surface.contrastText",
        },
        maxWidth: "80%",
        width: "fit-content",
        alignSelf: message.role === "user" ? "flex-start" : "flex-end",
      }}
    >
      <RTE
        text={message.content}
        setText={() => {
          // do nothing
        }}
        noToolbar
        readonly
      />
    </Box>
  );
};

const queryAI = false;

const Chat = () => {
  const [messages, setMessages] = React.useState<messagesType>(sample_messages);

  const [newMessage, setNewMessage] = React.useState<string>("");
  const [clear, setClear] = React.useState<boolean>(false);
  const addNewUserMessage = (message: string) => {
    const newMessage = {
      role: "user",
      content: message,
    } as messagesType[0];
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setNewMessage("");
    setClear(true);

    const query = {
      messages: newMessages,
    } as queryType;

    if (queryAI) {
      reflectChatAPI(query).then((res) => {
        const message_ = {
          role: "assistant",
          content: res as string,
        } as messagesType[0];
        setMessages([...newMessages, message_]);
      });
    }
  };

  // disable sending new message if no messages are present.
  // disable also if the last message is from the user.
  const disableSend =
    messages.length === 0 || messages.slice(-1)[0].role === "user";

  React.useEffect(() => {
    const query = {
      messages,
    };
    if (messages.length === 0 && queryAI) {
      reflectChatAPI(query).then((res) => {
        const message_ = {
          role: "assistant",
          content: res as string,
        } as messagesType[0];
        setMessages([message_]);
      });
    }
  }, []);

  //   const RTEClone = () => {
  //     return ;
  //   };

  return (
    <Stack spacing={2}>
      {messages.map((message) => (
        <DisplayMessage {...message} key={message.content} />
      ))}
      <Stack direction="row">
        <Box
          sx={{
            p: { xs: 0, md: 1 },
            borderRadius: 4,
            backgroundColor: {
              xs: "surfaceVariant.main",
              sm: "surface.main",
            },
            color: {
              xs: "surfaceVariant.contrastText",
              sm: "surface.contrastText",
            },
            flexGrow: 1,
          }}
        >
          <RTE
            text={newMessage}
            setText={setNewMessage}
            noToolbar
            clear={clear}
            setClear={setClear}
          />
        </Box>
        <IconButton
          color="primary"
          edge="end"
          onClick={() => addNewUserMessage(newMessage)}
          disabled={disableSend}
        >
          <Send />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default Chat;
