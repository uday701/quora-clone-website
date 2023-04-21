import {
  Avatar,
  Card,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdRefresh } from "react-icons/md";
import { Link } from "react-router-dom";
import { getRandomUsers } from "../api/users";
import Loading from "./Loading";


const FindUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await getRandomUsers({ size: 5 });
    setLoading(false);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClick = () => {
    fetchUsers();
  };

  return (
    <Card>
      <Stack spacing={2}>
       <Stack direction="row" alignItems="center" spacing={1} justifyContent="space-between">
                  <Stack direction="row" alignItems="center" spacing={1}>
            <AiOutlineUser />
            <Typography>Find Others</Typography>
          </Stack>
          <IconButton
            sx={{ padding: 0 }}
            disabled={loading}
            onClick={handleClick}
          >
            <MdRefresh />
          </IconButton>
        </Stack>

        <Divider />

        {loading ? (
          <Loading />
        ) : (
          users &&
          users.map((user) => (
              <Stack direction="row" alignItems="center" spacing={1} justifyContent="space-between" key={user._id}>
              <Stack>
               
                      <Avatar
                          sx={{
                              height: 30,
                              width: 30,
                              backgroundColor: "lightgrey",
                          }}
                          src={user.selectedFile ? user.selectedFile : "https://avatars.dicebear.com/api/croodles/" + user.username + ".svg"}
                      />
                <Typography>{user.username}</Typography>
              </Stack>
              <Link to={"/users/" + user.username}>View</Link>
            </Stack>
          ))
        )}
      </Stack>
    </Card>
  );
};

export default FindUsers;
