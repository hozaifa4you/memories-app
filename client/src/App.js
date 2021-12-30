import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

import memory from "./images/memories.png";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from "./styles";
import { getPosts } from "./redux/actions/postActions";

const App = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [currentId, setCurrentId] = useState(null);

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch, getPosts]);

	return (
		<Container maxWidth='lg'>
			<AppBar position='sticky' color='inherit' className={classes.appBar}>
				<Typography variant='h2' align='center' className={classes.heading}>
					Memories
				</Typography>
				<img
					src={memory}
					alt='memories'
					height={60}
					className={classes.image}
				/>
			</AppBar>
			<Grow in>
				<Container>
					<Grid
						container
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
		</Container>
	);
};

export default App;
