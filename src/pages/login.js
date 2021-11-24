import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../components/providers/auth.provider";
import { useState } from 'react';

const Login = () => {
	const [error, setError] = useState()

	let navigate = useNavigate();
	let location = useLocation();
	let auth = useAuth();

	let from = location.state?.from?.pathname || "/";

	const handleSubmit = async (event) => {
		event.preventDefault();

		setError(null)

		let formData = new FormData(event.currentTarget);
		let email = formData.get("email");
		let password = formData.get("password");

		try {
			await auth.SignIn({
				email,
				password
			}, () => {
					navigate('/admin', { replace: true });
			})
		}
		catch (e) {
			setError(e.message)
		}
	};

	return (
		<div className="text-3xl text-center pt-14 ">
			<p>You must log in to view the page at {from}</p>
			<p>{error}</p>

			<form className="flex flex-col mt-6" onSubmit={handleSubmit}>
				<label className="mb-5">
					Email: <input name="email" type="email" required />
				</label>
				<label>
					Password: <input name="password" type="password" required />
				</label>
				<button className="mt-7" type="submit" >Login</button>
			</form>
		</div>
	);
};

export default Login;