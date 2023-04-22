import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container,TextField,Box} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { loginUser } from "../../helpers/authHelper";
import { isLength, isEmail, contains } from "validator";
import ErrorAlert from "../ErrorAlert"
import { login, signup } from '../../api/users.js';

import useStyles from './SignupCss.js';
import Input from '../Input.js';
const initialState = { firstname: '', lastname: '',username:'', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const [serverError, setServerError] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const validate = () => {
        const errors = {};

        if (!isLength(form.username, { min: 8, max: 30 })) {
            errors.username = "Must be between 8 and 30 characters long";
        }

        if (contains(form.username, " ")) {
            errors.username = "Must contain only valid characters";
        }

        if (!isLength(form.password, { min: 8 })) {
            errors.password = "Must be at least 8 characters long";
        }

        if (!isEmail(form.email)) {
            errors.email = "Must be a valid email address";
        }
        if (form.password !== form.confirmPassword) {
           errors.confirmPassword="Password and Confirm Password not matching"
        }

        setErrors(errors);

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       
       
        if (isSignup) {
            const errorr = validate();
           
            if (Object.keys(errorr).length !== 0) return;
            const data = await signup(form);

            if (data.error) {
                setServerError(data.error);
            } else {
            
                loginUser(data);
                switchMode();
               
                navigate("/");
            }
            
        
        } else {
            const data = await login(form);
            
            if (data.error) {
                setServerError(data.error);
            } else {
                loginUser(data);
                navigate("/");
            }
           // dispatch(signin(form, history));
        }
    };

  

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                <Box component="form" className={classes.form} onSubmit={handleSubmit} spacing={2}>
                    <Grid container spacing={2} sx={{ m: 2 }}>
                        {isSignup && (
                            <>
                                <Input  variant="outlined" name="firstname" label="First Name" handleChange={handleChange} autoFocus half/>
                                <Input variant="outlined" name="lastname" label="Last Name" handleChange={handleChange} half/>
                                <TextField variant="outlined" fullWidth name="username" label="Username" onChange={handleChange} error={errors.username !== undefined}
                                    helperText={errors.username} />
                            </>
                        )}
                        <TextField margin="normal" sx={{ mb: 6 }} variant="outlined" fullWidth name="email" label="Email Address" onChange={handleChange} type="email" error={errors.email !== undefined}
                            helperText={errors.email}/>
                                                
                        <TextField margin="normal"  sx={{ mb: 6 }} variant="outlined" name="password" label="Password" fullWidth onChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} error={errors.password !== undefined}
                            helperText={errors.password } />
                        {isSignup && <TextField margin="normal" sx={{ mb: 6 }} variant="outlined" fullWidth name="confirmPassword" label="Repeat Password" onChange={handleChange} type="password" error={errors.confirmPassword !== undefined} helperText={errors.confirmPassword}/>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                  
                    <Grid container justify="flex-end">
                        <Grid item>
                            <ErrorAlert error={serverError} />
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
};

export default SignUp;