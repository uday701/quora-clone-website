import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { loginUser } from "../../helpers/authHelper";
import { isLength, isEmail, contains } from "validator";
import FileBase from 'react-file-base64';

import { login, signup } from '../../api/users.js';

import useStyles from './SignupCss.js';
import Input from '../Input.js';
import Icon from "../Icon.js"
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

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

        if (!isLength(form.username, { min: 6, max: 30 })) {
            errors.username = "Must be between 6 and 30 characters long";
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

        setErrors(errors);

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSignup) {
            const errors = validate();
            if (Object.keys(errors).length !== 0) return;
            const data = await signup(form);
            


            if (data.error) {
                setServerError(data.error);
            } else {
             console.log(data)
                loginUser(data);
                switchMode();
                //loginUser(data);
                //navigate("/");
            }
            
        
        } else {
            const data = await login(form);
            console.log(data)
            if (data.error) {
                setServerError(data.error);
            } else {
                loginUser(data);
                navigate("/");
            }
           // dispatch(signin(form, history));
        }
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            //dispatch({ type: AUTH, data: { result, token } });

            navigate.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                <Input name="username" label="Username" handleChange={handleChange} />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="564033717568-e5p23rhvcs4i6kffgsbci1d64r8hp6fn.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default SignUp;