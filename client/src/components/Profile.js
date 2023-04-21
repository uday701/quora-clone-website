import { useTheme } from "@emotion/react";
import {
  Avatar,
  Button,
  Card,
  Stack,
  Typography,
  Tooltip
} from "@mui/material";
import { Box } from "@mui/system";
import FileBase from 'react-file-base64';
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { isLoggedIn } from "../helpers/authHelper";
import ContentUpdateEditor from "./ContentUpdateEditor";
import Loading from "./Loading";

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const currentUser = isLoggedIn();
  const theme = useTheme();
  const iconColor = theme.palette.primary.main;

  useEffect(() => {
    if (props.profile) {
      setUser(props.profile.user);
    }
  }, [props.profile]);

  return (
    <Card>
      {user ? (
        <Stack alignItems="center" spacing={2}>
                  {currentUser && user._id === currentUser.userId && (<input
                      type="file"
                      accept="image/*"
                      onInput={props.submitFile}
                      style={{ display: 'none' }}
                      id="contained-button-file"
                  />)}
          <label htmlFor="contained-button-file">
          <Box my={1}>
                          <Tooltip title={currentUser && user._id === currentUser.userId ? "Click to change your profile" : ""}>

                          <Avatar
                              sx={{
                                  height: 150,
                                  width: 150,
                                  backgroundColor: "lightgrey",
                              }}
                              src={user.selectedFile ? user.selectedFile : "https://avatars.dicebear.com/api/croodles/" + user.username + ".svg"}
                          />
                          </Tooltip>
                          
          </Box>
          </label>

          <Typography variant="h5">{user.username}</Typography>

          {props.editing ? (
            <Box>
              <ContentUpdateEditor
                handleSubmit={props.handleSubmit}
                originalContent={user.biography}
                validate={props.validate}
              />
            </Box>
          ) : user.biography ? (
            <Typography textAlign="center" variant="p">
              <b>Bio: </b>
              {user.biography}
            </Typography>
          ) : (
            <Typography variant="p">
              <i>No bio yet</i>
            </Typography>
          )}
                  
          {currentUser && user._id === currentUser.userId && (
            <Box>
              <Button
                startIcon={<AiFillEdit color={iconColor} />}
                onClick={props.handleEditing}
              >
                {props.editing ? <>Cancel</> : <>Edit bio</>}
              </Button>
            </Box>
          )}

          {currentUser && user._id !== currentUser.userId && (
            <Button variant="outlined" onClick={props.handleMessage}>
              Message
            </Button>
          )}

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography color="text.secondary">
              Likes <b>{props.profile.posts.likeCount}</b>
            </Typography>
            <Typography color="text.secondary">
              Posts <b>{props.profile.posts.count}</b>
            </Typography>
          </Stack>
        </Stack>
      ) : (
        <Loading label="Loading profile" />
      )}
    </Card>
  );
};

export default Profile;
