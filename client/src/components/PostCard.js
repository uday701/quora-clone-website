import {
  Button,
  Card,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Box } from "@mui/system";
import React, { useState } from "react";
import { AiFillCheckCircle, AiFillEdit, AiFillMessage } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import ReadMoreReact from 'read-more-react';

import PostFooter from "./PostFooter";
import QuestionFooter from "./QuestionFooter";

import { deletePost, likePost, unlikePost, updatePost } from "../api/posts";
import { isLoggedIn } from "../helpers/authHelper";
import ContentDetails from "./ContentDetails";

import {} from "react-icons/ai";
import "./postCard.css";


const PostCard = (props) => {
  const { preview, removePost } = props;
  let postData = props.post;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = isLoggedIn();
  const isAuthor = user && user.username === postData.poster.username;

  const theme = useTheme();
  const iconColor = theme.palette.primary.main;

  const [editing, setEditing] = useState(false);
 
  const [post, setPost] = useState(postData);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [commentCount, setCommentCount] = useState(post.commentCount);
    

  let maxHeight = null;
  if (preview === "primary") {
    maxHeight = 800;
  }

  const handleDeletePost = async (e) => {
    e.stopPropagation();

    
      setLoading(true);
      await deletePost(post._id, isLoggedIn());
      setLoading(false);
      if (preview) {
        removePost(post);
      } else {
        navigate("/");
      }
    
  };

  const handleEditPost = async (e) => {
    e.stopPropagation();

    setEditing(!editing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    await updatePost(post._id, isLoggedIn(), { content });
    setPost({ ...post, content, edited: true });
    setEditing(false);
    navigate("/users/" + isLoggedIn().username);
  };

  const handleLike = async (liked) => {
    if (liked) {
      setLikeCount(likeCount + 1);
      await likePost(post._id, user);
    } else {
      setLikeCount(likeCount - 1);
      await unlikePost(post._id, user);
    }
  }

    return (
    <Card sx={{ padding: 0 }} className="post-card">
      <Box className={preview}>
                <Stack direction="row" alignItems="center" spacing={0} alignItems="initial">
         <Box sx={{padding: theme.spacing(2), width: "92%", "&:hover": { backgroundColor: "grey.50" },}} 
                clickable={preview} post={post} editing={editing}>
            <Stack direction="row" alignItems="center" spacing={1} justifyContent="space-between">
              <ContentDetails
                user={post.poster}
                createdAt={post.createdAt}
                edited={post.edited}
                preview={preview === "secondary"}
              />
              
            </Stack>

            {props.content!=="answer" && (<Typography
              variant="h5"
              gutterBottom
                            sx={{ overflow: "hidden", mt: 1, maxHeight: 125, "&:hover": { textDecoration: post.question ? "underline" : "none", cursor: post.question ? "pointer":"default"}}}
              onClick={post.question ?() => navigate("/questions/" + post.question):undefined}
              className="title"
            >
              {post.title}
            </Typography>)}

            {preview !== "secondary" && props.content!=="questions" &&
               (
              <ReadMoreReact text={post.content} max={1000} 
               readMoreText={<b>(more)</b>} />
              )}
                            
           {props.content!=="questions" && (
            <PostFooter likeCount={likeCount}
              commentCount={commentCount}
              liked={post.liked}
              onLike={handleLike}
              post={post}
               isAuthor={isAuthor}
               handleSubmit={handleSubmit}
               handleDeletePost={handleDeletePost}
                />
           )}

           {props.content==="questions" && (
            <QuestionFooter data={post} isAuthor={isAuthor} removePost={removePost}
            />)}
          </Box>
        </Stack>
      </Box>
      </Card>
  );
};

export default PostCard;
