import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { createPost } from "../../redux/actions/postActions";

const Form = () => {
	const classes = useStyles();
	const posts = useSelector(state => state.Posts);
	const [postData, setPostData] = useState({
		creator: "",
		title: "",
		message: "",
		tags: "",
		selectedFile: "",
	});
	const dispatch = useDispatch();

	//handle submit
	const handleSubmit = e => {
		e.preventDefault();
		dispatch(createPost(postData));
	};
	//clear form
	const clear = () => {};

	return (
		<Paper className={classes.paper}>
			<form
				autoComplete='off'
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={handleSubmit}>
				<Typography variant='h6'>Creating a Memory</Typography>
				<TextField
					name='creator'
					variant='outlined'
					label='Creator'
					fullWidth
					value={postData.creator}
					onChange={e =>
						setPostData({ ...postData, creator: e.target.value })
					}
				/>
				<TextField
					name='title'
					variant='outlined'
					label='Title'
					fullWidth
					value={postData.title}
					onChange={e =>
						setPostData({ ...postData, title: e.target.value })
					}
				/>
				<TextField
					name='message'
					variant='outlined'
					label='Message'
					fullWidth
					value={postData.message}
					onChange={e =>
						setPostData({ ...postData, message: e.target.value })
					}
				/>
				<TextField
					name='tags'
					variant='outlined'
					label='Tags'
					fullWidth
					value={postData.tags}
					onChange={e =>
						setPostData({ ...postData, tags: e.target.value })
					}
				/>
				<div className={classes.fileInput}>
					<FileBase
						type='file'
						multiple={false}
						onDone={({ base64 }) =>
							setPostData({ ...postData, selectedFile: base64 })
						}
					/>
				</div>
				<Button
					className={classes.buttonSubmit}
					variant='contained'
					size='large'
					type='submit'
					fullWidth
					color='primary'>
					Submit
				</Button>
				<Button
					variant='contained'
					color='secondary'
					size='small'
					onClick={clear}
					fullWidth>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
