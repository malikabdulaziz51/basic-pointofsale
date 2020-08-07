import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import swal from "sweetalert";
import "./register.css";
const SignupSchema = Yup.object().shape({
	username: Yup.string()
		.min(2, "username is too short!")
		.max(50, "username is too long!")
		.required("username is Required"),
	email: Yup.string()
		.email("invalid email")
		.required("email is required"),
	password: Yup.string().required("password is required"),
	confirm_password: Yup.string().oneOf(
		[Yup.ref("password"), null],
		"Both password need to be the same"
	)
});

class Register extends Component {
	submitForm = (values, history) => {
		axios
			.post("http://localhost:8080/register", values)
			.then((res) => {
				console.log(res.data.result);
				if (res.data.result === "success") {
					swal("Success!", res.data.message, "success").then((value) => {
						history.push("/login");
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
						type="text"
						name="email"
						onChange={handleChange}
						value={values.email}
						className="form-control"
						placeholder="Email"
						className={
							errors.email && touched.email
								? "form-control is-invalid"
								: "form-control"
						}
					/>
					{errors.email && touched.email ? (
						<small id="passwordHelp" class="text-danger">
							{errors.email}
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
				<div className="form-group has-feedback">
					<input
						type="password"
						name="confirm_password"
						onChange={handleChange}
						value={values.confirm_password}
						className="form-control"
						placeholder="Confirm Password"
						className={
							errors.confirm_password && touched.confirm_password
								? "form-control is-invalid"
								: "form-control"
						}
					/>
					{errors.confirm_password && touched.confirm_password ? (
						<small id="passwordHelp" class="text-danger">
							{errors.confirm_password}
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
							Confirm
						</button>
						<button
							type="button"
							onClick={() => {
								this.props.history.push("/login");
							}}
							className="btn btn-default btn-block btn-flat"
						>
							already member ?
						</button>
					</div>
				</div>
			</form>
		);
	};
	render() {
		return (
			<div className="register-box">
				<div className="register-logo">
					<a href="../../index2.html">
						<b>Basic</b>POS
					</a>
				</div>
				<div className="card">
					<div className="card-body register-card-body">
						<p className="register-box-msg">Register a new membership</p>
						<Formik
							initialValues={{
								username: "",
								email: "",
								password: "",
								confirm_password: ""
							}}
							onSubmit={(values, { setSubmitting }) => {
								this.submitForm(values, this.props.history);
								setSubmitting(false);
							}}
							validationSchema={SignupSchema}
						>
							{(props) => this.showForm(props)}
						</Formik>
					</div>
				</div>
			</div>
		);
	}
}

export default Register;
