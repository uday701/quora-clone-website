import {
    Button,
    Card,
    Link,
    Stack,
    TextField,
    Typography,
    Avatar
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuestion } from "../api/questions";
import ErrorAlert from "./ErrorAlert";
import { isLoggedIn } from "../helpers/authHelper";


const PostEditor = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
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
        if (isLoggedIn()) {
            if (formData.title[-1] != '?') {
                formData.title = formData.title + '?'
            }
            setLoading(true);
            const data = await createQuestion(formData, isLoggedIn());
            setLoading(false);
            if (data && data.error) {
                setServerError(data.error);
            }
            else {
                navigate("/users/" + user.username);
            }

        }
        else {
            navigate("/signup/");
        }
       
    };

    const validate = () => {
        const errors = {};

        return errors;
    };

    return (
        <Card>
            <Stack spacing={1}>
                {user && (
                    <Stack direction="row" alignItems="center" spacing={2}>
                        
                        <Avatar
                            sx={{
                                height: 50,
                                width: 50,
                                backgroundColor: "lightgrey",
                            }}
                            src={user.selectedFile ? user.selectedFile : "https://avatars.dicebear.com/api/croodles/" + user.username + ".svg"}
                        />
                        <Typography variant="h5">
                            What would you like to ask {user.username}?
                        </Typography>
                    </Stack>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Title"
                        required
                        name="title"
                        margin="normal"
                        onChange={handleChange}
                        error={errors.title !== undefined}
                        helperText={errors.title}
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
            </Stack>
        </Card>
    );
};

export default PostEditor;
