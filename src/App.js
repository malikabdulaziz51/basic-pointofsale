import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Dashboard from "./components/dashboard";
import Sidebar from "./components/sidebar";

function App() {
	return (
		<Router>
			<Switch>
				<div>
					<Header />
					<Sidebar />
					<Route path="/dashboard" component={Dashboard} />
					<Footer />
				</div>
			</Switch>
		</Router>
	);
}

export default App;
