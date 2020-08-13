import React, { Component } from 'react';

class Login extends Component {
	componentDidMount() {
		if (localStorage.getItem("TOKEN_KEY") != null) {
			return this.props.history.goBack();
		}
	}
	submitForm = (values, history) => {
		axios
			.post("http://localhost:8080/login", values)
			.then((res) => {
				console.log(res.data.result);
				if (res.data.result === "success") {
					localStorage.setItem("TOKEN_KEY", res.data.token);
					swal("Success!", res.data.message, "success").then((value) => {
						history.push("/dashboard");
					});
				} else if (res.data.result === "error") {
					swal("Error!", res.data.message, "error");
				}
			})
			.catch((err) => {
				console.log(err);
				swal("Error!", "Unexpected error", "error");
			});
	};
	showForm = ({
		values,
		errors,
		touched,
		handleChange,
		handleSubmit,
		setFieldValue,
		isSubmitting
	}) => {
		return (
			<form onSubmit={handleSubmit}>
				<div className="form-group has-feedback">
					<input
						type="text"
						name="username"
						onChange={handleChange}
						value={values.username}
						className="form-control"
						placeholder="Username"
						className={
							errors.username && touched.username
								? "form-control is-invalid"
								: "form-control"
						}
					/>
					{errors.username && touched.username ? (
						<small id="passwordHelp" class="text-danger">
							{errors.username}
						</small>
					) : null}
				</div>
				<div className="form-group has-feedback">
					<input
						type="password"
						name="password"
						onChange={handleChange}
						value={values.password}
						className="form-control"
						placeholder="Password"
						className={
							errors.password && touched.password
								? "form-control is-invalid"
								: "form-control"
						}
					/>
					{errors.password && touched.password ? (
						<small id="passwordHelp" class="text-danger">
							{errors.password}
						</small>
					) : null}
				</div>
				<div className="row">
					<div className="col-md-12">
						<button
							disabled={isSubmitting}
							type="submit"
							className="btn btn-primary btn-block btn-flat"
						>
							Login
						</button>
					</div>
				</div>
			</form>
		);
	};
	render() {
		return (
			<div>
				<div className="login-box">
					<div className="login-logo">
						<a href="../../index2.html">
							<b>Basic</b>POS
						</a>
					</div>
					{/* /.login-logo */}
					<div className="card">
						<div className="card-body login-card-body">
							<p className="login-box-msg">Sign in to start your session</p>
							<Formik
								initialValues={{
									username: "",
									password: ""
								}}
								onSubmit={(values, { setSubmitting }) => {
									this.submitForm(values, this.props.history);
									setSubmitting(false);
								}}
								validationSchema={SigninSchema}
							>
								{(props) => this.showForm(props)}
							</Formik>
							<div className="social-auth-links text-center mb-3">
								<p>- OR -</p>
								<a href="#" className="btn btn-block btn-primary">
									<i className="fab fa-facebook mr-2" /> Sign in using Facebook
								</a>
								<a href="#" className="btn btn-block btn-danger">
									<i className="fab fa-google-plus mr-2" /> Sign in using
									Google+
								</a>
							</div>
							{/* /.social-auth-links */}
							<p className="mb-1">
								<a href="forgot-password.html">I forgot my password</a>
							</p>
							<p className="mb-0">
								<a href="register.html" className="text-center">
									Register a new membership
								</a>
							</p>
						</div>
						{/* /.login-card-body */}
					</div>
				</div>
				{/* /.login-box */}
			</div>
		);
	}
}

export default Login;
