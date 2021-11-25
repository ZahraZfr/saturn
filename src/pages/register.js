import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../components/providers/auth.provider"
const Register = () => {

	const [error, setError] = useState(null);

	let navigate = useNavigate();
	const auth = useAuth()

	const handleSubmit = async (event) => {
		event.preventDefault()

		setError(null)

		let formData = new FormData(event.currentTarget);
		let email = formData.get("email");
		let password = formData.get("password");

		try {
			await auth.SignUp({
				email,
				password
			}, () => {
				alert("done")
				navigate("/", { replace: true });
			})
		} catch (e) {
			setError(e.message)
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit} className="text-center text-3xl flex flex-col p-60 bg-red-500 justify-center">
				<p className="mb-5">{error}</p>

				<label className="mb-5">
					Email: <input name="email" type="email" />
				</label>

				<label className="mb-5">
					Password: <input name="password" type="password" />
				</label>

				<button className="bg-gray-300" type="submit">Register</button>
			</form>
		</div>
	);
};

export default Register;