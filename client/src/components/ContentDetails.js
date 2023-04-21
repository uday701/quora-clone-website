import { Avatar, Typography,Stack } from "@mui/material";
import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const ContentDetails = ({ user, createdAt, edited, preview }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar
              sx={{
                  height: 30,
                  width: 30,
                  backgroundColor: "lightgrey",
              }}
              src={user.selectedFile ? user.selectedFile : "https://avatars.dicebear.com/api/croodles/" + user.username + ".svg"}
          />
      
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        <Link
         color="inherit" style={{ textDecoration: 'none' }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          to={"/users/" + user.username}
        >
          {user.username}
        </Link>
        {!preview && (
          <>
            {" "}
            · <Moment fromNow>{createdAt}</Moment> {edited && <>(Edited)</>}
          </>
        )}
      </Typography>
    </Stack>
  );
};

export default ContentDetails;
