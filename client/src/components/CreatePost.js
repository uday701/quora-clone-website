import { Button, Stack,TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import PostEditor from "./PostEditor";
import QuestionEditor from "./QuestionEditor";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


const CreatePost = () => {
    const navigate = useNavigate();


    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
   

    return (
        <>
            <TextField
                fullWidth
                label="What would you want to ask or share?"
                name="title"
                margin="normal"
                size="small"
                onClick={handleClickOpen}
                disabled
                sx={{
                    borderRadius: '40px'
                }}
            />


       <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
            >
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Add Question" value="1" />
                                <Tab label="Create Post" value="2" />
                               
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <QuestionEditor />
                        </TabPanel>
                        <TabPanel value="2"><PostEditor /></TabPanel>
                        
                    </TabContext>
                </Box>

        
            </Dialog>
            </>

  );
};

export default CreatePost;
