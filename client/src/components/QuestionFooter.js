import { IconButton, Button, Stack, Typography, TextField,Box,useTheme } from "@mui/material";
import React, { useState } from "react";
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createPost } from "../api/posts";
import ErrorAlert from "./ErrorAlert";
import { isLoggedIn } from "../helpers/authHelper";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteQuestion } from "../api/questions";

const QuestionFooter = (props) => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {
        setOpen(true);
    };
   
    const handleClose = () => {
        setOpen(false);
    };
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });

    const [serverError, setServerError] = useState("");
    const [errors, setErrors] = useState({});
    const user = isLoggedIn();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        const errors = validate();
        setErrors(errors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("react")
        setLoading(true);
        formData.title = props.data.title;
        formData.question = props.data._id;
        console.log(formData)
        console.log(props.data)
        const data = await createPost(formData, isLoggedIn());
        setLoading(false);
        if (data && data.error) {
            setServerError(data.error);
        } else {
            navigate("/users/" + isLoggedIn().username);
        }
        handleClose()
    };
    const validate = () => {
        const errors = {};

        return errors;
    };
    const handleDeletePost = async (e) => {
        e.stopPropagation();


        setLoading(true);
        await deleteQuestion(props.data._id, isLoggedIn());
        setLoading(false);
       
        props.removePost(props.data);

    };
  return (
  <>
          <Stack justifyContent="space-between" direction="row">
      <IconButton sx={{ padding: 0.45, fontSize: 15 }} onClick={handleClickOpen}>
          <EditNoteOutlinedIcon/> Answer
      </IconButton>
              {props.isAuthor && (<IconButton sx={{ padding: 0.45, fontSize: 15 }} onClick={handleDeletePost}>
              <DeleteIcon />
          </IconButton>)}
    </Stack>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
            >
       
              <DialogTitle variant="h3">
                  {props.data.title}
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
                      error={errors.content !== undefined}
                      helperText={errors.content}
                      required
                  />
                  <ErrorAlert error={serverError} />
                  <Button
                      variant="outlined"
                      type="submit"
                      fullWidth
                      disabled={loading}
                      sx={{
                          mt: 2,
                      }}
                  >
                      {loading ? <>Submitting</> : <>Submit</>}
                  </Button>
              </Box>
             </DialogContent>
        </Dialog>
        </>

     )
};

export default QuestionFooter;