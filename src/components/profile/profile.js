import React, { Component } from "react";
import * as Yup from "yup";
import Axios from "axios";
import { Formik } from "formik";
import Footer from "../footer";
import Sidebar from "../sidebar";
import Header from "../header";
import swal from "sweetalert";
const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const ProfileSchema = Yup.object().shape({
	avatars: Yup.mixed()
		.required("A file is required")
		.test(
			"fileSize",
			"File too large",
			(value) => value && value.size <= FILE_SIZE
		)
		.test(
			"fielFormat",
			"Unsupported Format",
			(value) => value && SUPPORTED_FORMATS.includes(value.type)
		),
	username: Yup.string()
		.min(2, "username is too short!")
		.max(50, "username is too long!")
		.required("username is Required"),
	first_name: Yup.string()
		.min(2, "firstname is too short!")
		.max(30, "firstname is too long!")
		.required("firstname is Required"),
	last_name: Yup.string()
		.min(2, "lastname is too short!")
		.max(30, "lastname is too long!")
		.required("lastname is Required"),
	phone: Yup.number("Phone number is use only number")
		.min(12, "phone number must be 12 character!")
		.required("phone number is Required"),
	address: Yup.string()
		.min(2, "address is too short!")
		.max(50, "address is too long!")
		.required("address is Required"),
	email: Yup.string()
		.email("invalid email")
		.required("email is required"),
	password: Yup.string().required("password is required"),
	confirm_password: Yup.string().oneOf(
		[Yup.ref("password"), null],
		"Both password need to be the same"
	)
});

class Profile extends Component {
	state = {
		response: {},
		error_message: null,
		avatars: ""
	};
	componentDidMount() {
		let { id } = this.parseJwt();
		this.getData(id);
		console.log("data", this.getData(id));
	}

	parseJwt() {
		let token = localStorage.getItem("TOKEN_KEY");
		var base64Url = token.split(".")[1];
		var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		var jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map((c) => {
					return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join("")
		);
		return JSON.parse(jsonPayload);
	}

	getData = async (id) => {
		await Axios.get("http://localhost:8080/profile/id/" + id)
			.then((response) => {
				document.getElementById("avatars").src =
					"http://localhost:8080/images/" + response.data.avatars;
				this.setState({ response: response.data });
			})
			.catch((error) => {
				this.setState({ error_message: error.message });
			});
	};

	showPreviewImage = (values) => {
		return (
			<div className="text-center">
				<img
					id="avatars"
					src={
						values.file_obj != null
							? values.file_obj
							: "http://localhost:8080/images/user.png"
					}
					className="profile-user-img img-fluid img-circle"
					width={100}
					style={{ marginTop: "10px" }}
				/>
			</div>
		);
	};

	showForm = ({
		values,
		errors,
		touched,
		handleChange,
		handleSubmit,
		onSubmit,
		isSubmitting,
		setFieldValue
	}) => {
		return (
			<form role="form" onSubmit={handleSubmit}>
				{this.showPreviewImage(values)}
				<div className="card-body">
					<div className="form-group">
						<label htmlFor="exampleInputFile">Avatar upload</label>
						<div className="input-group">
							<div className="custom-file">
								<input
									type="file"
									onChange={(e) => {
										e.preventDefault();
										setFieldValue("avatars", e.target.files[0]);
										setFieldValue(
											"file_obj",
											URL.createObjectURL(e.target.files[0])
										);
									}}
									name="avatars"
									className={
										errors.email && touched.email
											? "form-control is-invalid"
											: "form-control"
									}
									accept="image/"
									id="avatars"
									className="custom-file-input"
									id="exampleInputFile"
								/>
								<label htmlFor="exampleInputFile" className="custom-file-label">
									Choose File
								</label>
							</div>
						</div>
					</div>
					<input type="hidden" name="id" value={values._id} />
					<div className="form-group has-feedback">
						<label htmlFor="email">Email Adress</label>
						<input
							onChange={handleChange}
							value={values.email}
							type="text"
							className={
								errors.email && touched.email
									? "form-control is-invalid"
									: "form-control"
							}
							id="email"
							placeholder="Enter Email"
						/>
						<label htmlFor="username">Username</label>
						<input
							onChange={handleChange}
							value={values.username}
							type="text"
							className={
								errors.username && touched.username
									? "form-control is-invalid"
									: "form-control"
							}
							id="username"
							placeholder="Enter UserName"
						/>
						<label htmlFor="username">First Name</label>
						<input
							onChange={handleChange}
							value={values.first_name}
							type="text"
							className={
								errors.first_name && touched.first_name
									? "form-control is-invalid"
									: "form-control"
							}
							id="first_name"
							placeholder="Enter First Name"
						/>
						{errors.first_name && touched.first_name ? (
							<small id="passwordHelp" className="text-danger">
								{errors.first_name}
							</small>
						) : null}
					</div>
					<div className="form-group has-feedback">
						<label htmlFor="last_name">Last Name</label>
						<input
							onChange={handleChange}
							value={values.last_name}
							type="text"
							className={
								errors.last_name && touched.last_name
									? "form-control is-invalid"
									: "form-control"
							}
							id="last_name"
							placeholder="Enter Last Name"
						/>
						{errors.last_name && touched.last_name ? (
							<small id="passwordHelp" className="text-danger">
								{errors.last_name}
							</small>
						) : null}
					</div>
					<div className="form-group has-feedback">
						<label htmlFor="phone">Phone Number</label>
						<input
							onChange={handleChange}
							value={values.phone}
							type="text"
							className={
								errors.phone && touched.phone
									? "form-control is-invalid"
									: "form-control"
							}
							id="phone"
							placeholder="Enter phone number"
						/>
						{errors.phone && touched.phone ? (
							<small id="passwordHelp" className="text-danger">
								{errors.phone}
							</small>
						) : null}
					</div>
					<div className="form-group has-feedback">
						<label htmlFor="address">address</label>
						<textarea
							onChange={handleChange}
							value={values.address}
							className={
								errors.address && touched.address
									? "form-control is-invalid"
									: "form-control"
							}
							id="address"
							placeholder="Address"
						/>
						{errors.address && touched.address ? (
							<small id="passwordHelp" className="text-danger">
								{errors.address}
							</small>
						) : null}
					</div>
				</div>
				{}
				<div className="card-footer">
					<button
						type="submit"
						disabled={isSubmitting}
						className="btn btn-block btn-primary"
					>
						Save
					</button>
				</div>
			</form>
		);
	};

	submitForm = async (formData) => {
		await Axios.put("http://localhost:8080/profile", formData)
			.then((res) => {
				if (res.data.result === "success")
					swal("Success!", res.data.message, "success");
				else if (res.data.result === "error")
					swal("Error!", res.data.message, "error");
			})
			.catch((error) => {
				console.log(error);
				swal("Error!", "Unexpected Error", "error");
			});
	};

	render() {
		let result = this.state.response;
		console.log(result);
		return (
			<>
				<Header />
				<Sidebar />
				<div className="content-wrapper">
					<section className="content-header">
						<div className="container-fluid">
							<div className="row mb-2">
								<div className="offset-md-3 col-sm-8">
									<h1>Profile</h1>
								</div>
							</div>
						</div>
						{/* /.container-fluid */}
					</section>

					<section className="content">
						<div className="container-fluid">
							<div className="row">
								<div className="offset-3 col-md-6">
									<div className="card card-primary">
										<div className="card-header">
											<h3 className="card-title">Update Profile</h3>
										</div>
										<Formik
											enableReinitialize={true}
											initialValues={
												result
													? result
													: {
															id: "",
															username: "",
															email: "",
															first_name: "",
															last_name: "",
															phone: "",
															address: ""
													  }
											}
											onSubmit={(values, { setSubmitting }) => {
												let formData = new FormData();
												formData.append("id", values._id);
												formData.append("username", values.username);
												formData.append("first_name", values.first_name);
												formData.append("last_name", values.last_name);
												formData.append("phone", values.phone);
												formData.append("address", values.address);
												formData.append("email", values.email);
												if (values.avatars) {
													formData.append("avatars", values.avatars);
												}
												this.submitForm(formData, this.props.history);
												setSubmitting(false);
											}}
											validationSchema={ProfileSchema}
										>
											{(props) => this.showForm(props)}
										</Formik>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</>
		);
	}
}

export default Profile;
