import React from "react";
import {
	Card,
	CardContent,
	CardMedia,
	Button,
	Typography,
	CardActions,
} from "@material-ui/core";
import { ThumbUpAlt, Delete, MoreHoriz } from "@material-ui/icons";
import moment from "moment";

import useStyles from "./styles";

const Post = ({ post, setCurrentId }) => {
	const classes = useStyles();

	return (
		<Card className={classes.card}>
			<CardMedia
				className={classes.media}
				image={post?.selectedFile}
				title={post?.title}
			/>
			<div className={classes.overlay}>
				<Typography variant='h6'>{post?.creator}</Typography>
				<Typography variant='body2'>
					{moment(post?.createdAt).fromNow()}
				</Typography>
			</div>
			<div className={classes.overlay2}>
				<Button
					style={{ color: "white" }}
					size='small'
					onClick={() => setCurrentId(post?._id)}>
					<MoreHoriz fontSize='medium' />
				</Button>
			</div>
			<div className={classes.details}>
				<Typography variant='body2' color='textSecondary'>
					{post?.tags?.map(tag => `#${tag}`)}
				</Typography>
			</div>
			<Typography className={classes.title} variant='h6' gutterBottom>
				{post?.title}
			</Typography>
			<CardContent>
				<Typography variant='h5' gutterBottom>
					{post?.message}
				</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<Button size='small' color='primary' onClick={() => {}}>
					<ThumbUpAlt fontSize='small' />
					Like {post?.likeCount}
				</Button>
				<Button size='small' color='primary' onClick={() => {}}>
					<Delete fontSize='small' />
					Delete
				</Button>
			</CardActions>
		</Card>
	);
};

export default Post;
