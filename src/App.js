import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Dashboard from "./components/dashboard";
import Sidebar from "./components/sidebar";
import Register from "./components/register";
import Login from "./components/login";

function App() {
	return (
		<Router>
			<Switch>
				<div className="App">
					<Route path="/register" component={Register} />
					<Route path="/login" component={Login} />
					{/* <Header />
					<Sidebar /> */}
					<Route path="/dashboard" component={Dashboard} />
					{/* <Footer /> */}
				</div>
			</Switch>
		</Router>
	);
}

export default App;
