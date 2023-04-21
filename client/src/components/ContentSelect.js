import { MenuItem, Select, Typography,Stack } from "@mui/material";
import React, { useState } from "react";


const ContentSelect = () => {
  const [content, setContent] = useState("post");

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography>Content:</Typography>
      <Select
        size="small"
        value={content}
        sx={{ minWidth: 150 }}
        onChange={(e) => setContent(e.target.value)}
      >
        <MenuItem value={"post"}>Posts</MenuItem>
        <MenuItem value={"comment"}>Comments</MenuItem>
      </Select>
    </Stack>
  );
};

export default ContentSelect;
