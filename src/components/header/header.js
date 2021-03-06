import React, { Component } from "react";
import swal from "sweetalert";
import { withRouter, Link } from "react-router-dom";
class Header extends Component {
	Logout = () => {
		swal("Are you sure SignOut?", {
			buttons: {
				nope: {
					text: "Let me back",
					value: "nope"
				},
				sure: {
					text: "I'm sure",
					value: "sure"
				}
			}
		}).then((value) => {
			switch (value) {
				case "sure":
					localStorage.removeItem("TOKEN_KEY");
					return this.props.history.push("/login");
				case "nope":
					swal("OK", "success");
					break;
				default:
					swal("Got away safely!");
			}
		});
	};
	render() {
		return (
			<div>
				{/* Navbar */}
				<nav className="main-header navbar navbar-expand navbar-white navbar-light">
					{/* Left navbar links */}
					<ul className="navbar-nav">
						<li className="nav-item">
							<a
								className="nav-link"
								data-widget="pushmenu"
								href="#"
								role="button"
							>
								<i className="fas fa-bars" />
							</a>
						</li>
						<li className="nav-item d-none d-sm-inline-block">
							<a href="../../index3.html" className="nav-link">
								Home
							</a>
						</li>
						<li className="nav-item d-none d-sm-inline-block">
							<a href="#" className="nav-link">
								Contact
							</a>
						</li>
					</ul>
					{/* SEARCH FORM */}
					<form className="form-inline ml-3">
						<div className="input-group input-group-sm">
							<input
								className="form-control form-control-navbar"
								type="search"
								placeholder="Search"
								aria-label="Search"
							/>
							<div className="input-group-append">
								<button className="btn btn-navbar" type="submit">
									<i className="fas fa-search" />
								</button>
							</div>
						</div>
					</form>
					{/* Right navbar links */}
					<ul className="navbar-nav ml-auto">
						<li className="nav-item dropdown">
							<a className="nav-link" data-toggle="dropdown" href="#">
								<i className="far fa-user" />
							</a>
							<div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
								<span className="dropdown-item dropdown-header">menu</span>
								<div className="dropdown-divider" />
								<Link to="/profile" className="dropdown-item">
									<i className="fas fa-user-alt mr-2" />
									Update Profile LLL
								</Link>
								<div className="dropdown-divider" />
								<a
									href="#"
									onClick={() => this.Logout()}
									className="dropdown-item"
								>
									<i className="fas fa-sign-out-alt mr-2" /> Logout
								</a>
							</div>
						</li>
					</ul>
				</nav>
				{/* /.navbar */}
			</div>
		);
	}
}

export default withRouter(Header);
