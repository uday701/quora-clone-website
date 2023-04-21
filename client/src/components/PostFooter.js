import { IconButton, Stack, Typography, useTheme,Box,TextField,Button } from "@mui/material";
import React, { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../helpers/authHelper";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import Comments from "./Comments";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';

const PostFooter = (props) => {
    const [open, setOpen] = React.useState(false);
    const { likeCount, onLike } = props;
    const theme = useTheme();
    const [liked, setLiked] = useState(props.liked);
    const [comment, setComment] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });

    let params = {}
    params.id=props.post._id
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        
    };
    const handleSubmit = (e) => {
         props.handleSubmit(e)
         handleClose()
    }

    const handleLike = (e) => {
        if (isLoggedIn()) {
            const newLikedValue = !liked;
            
            setLiked(newLikedValue);
            onLike(newLikedValue);
        } else {
            navigate("/signup");
        }
    };
    const handleComment = (e) => {
        const c = !comment;
        setComment(c);
    }

    return (
    <>
        <Stack justifyContent="space-between" direction="row" >
            <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 4 }} sx={{
            padding: theme.spacing(1),
        }}>
            <span>
                    <IconButton sx={{ padding: 0.45 }} onClick={handleLike}>
                    {liked ? (
                        <IconContext.Provider value={{ color: theme.palette.primary.main }}>
                            < UploadRoundedIcon fontSize="large" sx={{ fontSize: 40 }} />
                        </IconContext.Provider>
                    ) : (
                            <UploadOutlinedIcon fontSize="large" sx={{ fontSize: 40 }} />
                    )}
                </IconButton>
                  { likeCount}</span>
                <IconButton sx={{ padding: 0.45 }} onClick={handleComment}>
            <span><ChatBubbleOutlineIcon fontSize="small"/>
                <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ fontWeight: "bold" }}
                >
                    {props.commentCount}
                </Typography>
                </span>
            </IconButton>
        </Stack>

                {props.isAuthor && (<Stack direction="row" justifyContent="flex-end" spacing={{ xs: 1, sm: 2, md: 4 }} sx={{
                    padding: theme.spacing(1),
                }}>

                    <IconButton sx={{ padding: 0.45 }} >
                        < EditOutlinedIcon onClick={handleClickOpen}/>
                    </IconButton>


                    <IconButton sx={{ padding: 0.45 }} onClick={props.handleDeletePost} >
                        <span><DeleteIcon fontSize="small" />

                        </span>
                    </IconButton>
                </Stack>)}
        </Stack>
        { comment && (<Comments params={params} />) }
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle variant="h3">
                    {props.post.title}
                </DialogTitle >
                <DialogContent>
                <Box component="form" onSubmit={handleSubmit}>

                    <TextField
                        fullWidth
                        label="Content"
                        multiline
                        rows={10}
                        name="content"
                        margin="normal"
                        onChange={handleChange}
                        
                        required
                    />
                   
                    <Button
                        variant="outlined"
                        type="submit"
                        fullWidth
                       
                        sx={{
                            mt: 2,
                        }}
                    > Submit
                    </Button>
                </Box>
                </DialogContent>
            </Dialog>
       </>
    );
};

export default PostFooter;
