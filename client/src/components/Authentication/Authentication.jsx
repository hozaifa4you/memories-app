import React, { useState } from "react";
import {
	Avatar,
	Button,
	Paper,
	Grid,
	Typography,
	Container,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useStyles from "./styles";
import Input from "./Input";
import Icon from "./Icon";
import { AUTH } from "../../redux/types/authTypes";
import { signup, signin } from "../../redux/actions/authAction";

// const isSignup = false;
const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const Authentication = () => {
	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(true);
	const [isSignup, setIsSignup] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [formData, setFormData] = useState(initialState);
	/// submit
	const submitHandler = e => {
		e.preventDefault();
		// check sign up or not
		if (isSignup) {
			dispatch(signup(formData, navigate));
		} else {
			dispatch(signin(formData, navigate));
		}
	};
	// change
	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	// show password
	const handleShowPassword = () =>
		setShowPassword(prevShowPassword => !prevShowPassword);
	// switch mode
	const switchMode = () => {
		setIsSignup(prevIsSignup => !prevIsSignup);
		handleShowPassword(false);
	};
	// google button
	const googleSuccess = async res => {
		const result = res?.profileObj;
		const token = res?.tokenId;

		try {
			dispatch({ type: AUTH, data: { result, token } });
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};
	const googleFailure = async error => console.log(error);

	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlined />
				</Avatar>
				<Typography variant='h5'>
					{isSignup ? "Sign Up" : "Sign In"}
				</Typography>
				<form className={classes.form} onSubmit={submitHandler}>
					<Grid container spacing={2}>
						{isSignup && (
							<>
								<Input
									name='firstName'
									label='First Name'
									handleChange={handleChange}
									autoFocus
									half
								/>

								<Input
									name='lastName'
									label='Last Name'
									handleChange={handleChange}
									half
								/>
							</>
						)}
						<Input
							name='email'
							label='Email Address'
							handleChange={handleChange}
							type='email'
						/>
						<Input
							name='password'
							label='Password'
							handleChange={handleChange}
							type={showPassword ? "text" : "password"}
							handleShowPassword={handleShowPassword}
						/>
						{isSignup && (
							<Input
								name='confirmPassword'
								label='Repeat Password'
								handleChange={handleChange}
								type='password'
							/>
						)}
					</Grid>

					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}>
						{isSignup ? "Sign Up" : "Sign In"}
					</Button>

					{/* This is google login button */}
					<GoogleLogin
						clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
						render={renderProps => (
							<Button
								variant='contained'
								className={classes.googleButton}
								color='primary'
								fullWidth
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								startIcon={<Icon />}>
								Google Sign In
							</Button>
						)}
						onSuccess={googleSuccess}
						onFailure={googleFailure}
						cookiePolicy='single_host_origin'
					/>

					<Grid container justifyContent='flex-end'>
						<Grid item>
							<Button onClick={switchMode}>
								{isSignup
									? "Already have an account? Sign In"
									: "Don't have an account? Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Authentication;
