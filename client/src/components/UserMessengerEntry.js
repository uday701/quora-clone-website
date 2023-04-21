import {
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Avatar
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import moment from "moment";

const UserMessengerEntry = (props) => {
  const recipient = props.conversation.recipient;
  const username = recipient.username;
  const selected =
    props.conservant && props.conservant.username === recipient.username;

  const handleClick = () => {
    props.setConservant(recipient);
  };

  return (
    <>
      <MenuItem
        onClick={handleClick}
        sx={{ padding: 2 }}
        divider
        disableGutters
        selected={selected}
      >
        <ListItemAvatar>
                  <Avatar
                      sx={{
                          height: 45,
                          width: 45,
                          backgroundColor: "lightgrey",
                      }}
                      src={recipient.selectedFile ? recipient.selectedFile : "https://avatars.dicebear.com/api/croodles/" + recipient.username + ".svg"}
                  />
         
        </ListItemAvatar>
        <ListItemText
          primary={username}
          secondary={moment(props.conversation.lastMessageAt).fromNow()}
        />
      </MenuItem>
    </>
  );
};

export default UserMessengerEntry;
