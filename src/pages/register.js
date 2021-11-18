import { useState } from "react";
import { useNavigate } from "react-router";
import {useAuth} from "../components/providers/auth.provider"
const Register = () =>
{

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
				navigate("/", { replace: true });
			})
		} catch (e) {
			setError(e.message)
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<p>{error}</p>
				<label>
					Email: <input name="email" type="email" />
				</label>{" "}
				<label>
					Password: <input name="password" type="password" />
				</label>{" "}
				<button type="submit">Register</button>
			</form>
		</div>
	);
};

export default Register;