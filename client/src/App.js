import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar, Home, Authentication } from "./components";

const App = () => {
	return (
		<BrowserRouter>
			<Container maxWidth='lg'>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/authentication' element={<Authentication />} />
				</Routes>
			</Container>
		</BrowserRouter>
	);
};

export default App;
