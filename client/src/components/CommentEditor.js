import {
  Button,
  Card,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createComment } from "../api/posts";
import { isLoggedIn } from "../helpers/authHelper";
import ErrorAlert from "./ErrorAlert";

const CommentEditor = ({ label, comment, addComment, setReplying, params }) => {
  const [formData, setFormData] = useState({
    content: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      ...formData,
      parentId: comment && comment._id,
    };

    setLoading(true);
    console.log(body)
    console.log(params)
    const data = await createComment(body, params, isLoggedIn());
    setLoading(false);

    if (data.error) {
      setError(data.error);
    } else {
      formData.content = "";
      setReplying && setReplying(false);
      addComment(data);
    }
  };

  const handleFocus = (e) => {
    !isLoggedIn() && navigate("/signup");
  };

  return (
    <Card>
      <Stack spacing={2}>
        <Stack direction="row" alignItems="center" spacing={1} justifyContent="space-between">
          <Typography variant="h5">
            {comment ? <>Reply</> : <>Comment</>}
          </Typography>
          <Link to="https://commonmark.org/help/" target="_blank">
            Markdown Help
          </Link>
        </Stack>

              <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex" }}>
          <TextField
            multiline
            fullWidth
            label={label}
            // rows={5}
            required
            name="content"
            sx={{
                backgroundColor: "white", flexGrow: 1, maxWidth: 400, borderRadius: '4px'
            }}
            size="small"
            onChange={handleChange}
            onFocus={handleFocus}
            value={formData.content}
          />


          <ErrorAlert error={error} sx={{ my: 4 }} />
          <Button
            variant="outlined"
            type="submit"
            
            disabled={loading}
            sx={{
              backgroundColor: "white",
              
            }}
          >
        {loading ? <Typography sx={{ fontSize: 8 }}>Adding Comment</Typography> : <Typography sx={{ fontSize: 8 }}>Add Comment</Typography>}
          </Button>
        </Box> 
      </Stack>
    </Card>
  );
};

export default CommentEditor;
