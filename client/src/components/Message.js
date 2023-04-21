import { Avatar, Card, useTheme,Stack } from "@mui/material";
import React from "react";

const Message = (props) => {
  const username = props.conservant.username;
  const message = props.message;
  const theme = useTheme();

  let styles = {};
  if (message.direction === "to") {
    styles = {
      justifyContent: "flex-start",
    };
  } else if (message.direction === "from") {
    styles = {
      messageColor: theme.palette.grey["100"],
      justifyContent: "flex-end",
    };
  }

  return (
    <Stack direction="row" alignItems="center" spacing={1}
      sx={{ paddingY: 1, width: "100%" }}
      spacing={2}
      justifyContent={styles.justifyContent}
      alignItems="flex-end"
    >
      {message.direction === "to" && (
      <Avatar
              sx={{
                  height: 30,
                  width: 30,
                  backgroundColor: "lightgrey",
              }}
              src={ props.conservant.selectedFile ?  props.conservant.selectedFile : "https://avatars.dicebear.com/api/croodles/" +  props.conservant.username + ".svg"}
          />
      )}

      <Card
        sx={{
          borderRadius: "25px",
          backgroundColor: styles.messageColor,
          borderWidth: "1px",
          paddingY: "12px",
          maxWidth: "70%",
          paddingX: 2,
        }}
      >
        {message.content}
      </Card>
    </Stack>
  );
};

export default Message;
