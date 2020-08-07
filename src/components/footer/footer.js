import React, { Component } from "react";

class Footer extends Component {
	render() {
		return (
			<div>
				<div>
					<footer className="main-footer">
						<div className="float-right d-none d-sm-block">
							<b>Version</b> 3.1.0-pre
						</div>
						<strong>
							Copyright © 2014-2020{" "}
							<a href="https://adminlte.io">AdminLTE.io</a>.
						</strong>{" "}
						All rights reserved.
					</footer>
					{/* Control Sidebar */}
					<aside className="control-sidebar control-sidebar-dark">
						{/* Control sidebar content goes here */}
					</aside>
					{/* /.control-sidebar */}
				</div>
			</div>
		);
	}
}

export default Footer;
