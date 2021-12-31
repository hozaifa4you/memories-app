import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import memory from "../../images/memories.png";
import { LOGOUT } from "../../redux/types/authTypes";

// const user = null;

const Navbar = () => {
	const classes = useStyles();
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("profile"))
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const logout = () => {
		dispatch({ type: LOGOUT });
		navigate("/");
		setUser(null);
	};

	useEffect(() => {
		const token = user?.token;

		// jwt

		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [user, location]);

	return (
		<AppBar position='sticky' color='inherit' className={classes.appBar}>
			<div className={classes.brandContainer}>
				<Typography
					variant='h2'
					align='center'
					className={classes.heading}
					component={Link}
					to='/'>
					Memories
				</Typography>
				<img
					src={memory}
					alt='memories'
					height={60}
					className={classes.image}
				/>
			</div>
			<Toolbar className={classes.toolbar}>
				{user ? (
					<div className={classes.profile}>
						<Avatar
							className={classes.purple}
							alt={user?.result?.name}
							src={user?.result?.imageUrl}>
							{user?.result?.name?.charAt(0)}
						</Avatar>
						<Typography className={classes.userName} variant='h6'>
							{user?.result?.name}
						</Typography>
						<Button
							variant='contained'
							className={classes.logout}
							color='secondary'
							onClick={logout}>
							Logout
						</Button>
					</div>
				) : (
					<Button
						component={Link}
						to='/authentication'
						variant='contained'
						color='primary'>
						Sign in
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
