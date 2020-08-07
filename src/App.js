import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from "react-router-dom";
import "./App.css";

import Dashboard from "./components/dashboard";
import Register from "./components/register";
import Login from "./components/login";
import Profile from "./components/profile";

const isLoggedIn = () => {
	return localStorage.getItem("TOKEN_KEY") != null;
};

const SecuredRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			// ternary condition

			isLoggedIn() === true ? (
				<Component {...props} />
			) : (
				<Redirect to="/login" />
			)
		}
	/>
);
class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<div>
						<Route path="/register" component={Register} />
						<Route path="/login" component={Login} />
						<SecuredRoute path="/profile" component={Profile} />
						<SecuredRoute path="/dashboard" component={Dashboard} />
					</div>
				</Switch>
			</Router>
		);
	}
}

export default App;
