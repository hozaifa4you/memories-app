import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
import { VisibilityOff, Visibility } from "@material-ui/icons";

const Input = ({
	handleChange,
	label,
	autoFocus,
	type,
	name,
	half,
	handleShowPassword,
}) => {
	return (
		<Grid item xs={12} sm={half ? 6 : 12}>
			<TextField
				name={name}
				onChange={handleChange}
				variant='outlined'
				required
				fullWidth
				label={label}
				autoFocus={autoFocus}
				type={type}
				inputProps={
					name === "password"
						? {
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton onClick={handleShowPassword}>
											{type === "password" ? (
												<Visibility />
											) : (
												<VisibilityOff />
											)}
										</IconButton>
									</InputAdornment>
								),
						  }
						: {}
				}
			/>
		</Grid>
	);
};

export default Input;