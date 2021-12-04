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
			<p className="text-5xl">You must log in to view the page at {from}</p>
			<p className="text-red-500 text-base">{error}</p>

			<form className="flex flex-col mt-6" onSubmit={handleSubmit}>
				<label className="mb-5">
					Email: <input className="shadow-2xl bg-white w-1/5 py-5 rounded-2xl mx-8 mt-28" name="email" type="email" required />
				</label>
				<label>
					Password: <input className="shadow-2xl bg-white w-1/5 py-5 rounded-2xl mx-8" name="password" type="password" required />
				</label>
				<button className=" flex items-center justify-center mt-7 mx-auto border-black bg-green-400 px-36 py-5 w-32 rounded-full" type="submit" >Login</button>
			</form>
		</div>
	);
};

export default Login;