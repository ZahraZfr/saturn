import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../components/providers/auth.provider";

const Login = () =>
{
	let navigate = useNavigate();
	let location = useLocation();
	let auth = useAuth();

	let from = location.state?.from?.pathname || "/";

	function handleSubmit(event)
	{
		event.preventDefault();

		let formData = new FormData(event.currentTarget);
		let email = formData.get("email");
		let password = formData.get("password");

		auth.SignIn(email , password , () =>
		{
			navigate(from, { replace: true });
		});
	}

	return (
		<div>
			<p>You must log in to view the page at {from}</p>

			<form onSubmit={handleSubmit}>
				<label>
					Email: <input name="email" type="email" />
				</label>{" "}
				<label>
					Password: <input name="password" type="password" />
				</label>{" "}
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;