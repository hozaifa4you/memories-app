import React, { useState, useEffect } from "react";
import { Grow, Container, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { Posts, Form } from "../../components";
import useStyles from "./styles";
import { getPosts } from "../../redux/actions/postActions";

const Home = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [currentId, setCurrentId] = useState(null);

	useEffect(() => {
		dispatch(getPosts());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, getPosts]);
	return (
		<Grow in>
			<Container>
				<Grid
					container
					className={classes.mainContainer}
					justifyContent='space-between'
					alignItems='stretch'
					spacing={3}>
					<Grid item xs={12} sm={7}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} sm={4}>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
