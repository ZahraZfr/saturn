import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../components/providers/auth.provider";

const Login = () => {

	let navigate = useNavigate();
	let location = useLocation();
	let auth = useAuth();

	let from = location.state?.from?.pathname || "/";

	function handleSubmit(event) {
		event.preventDefault();

		let formData = new FormData(event.currentTarget);
		let username = formData.get("username");

		auth.SignIn(username, () => {
			navigate(from, { replace: true });
		});
	}
	return (
		<div>
			<p>You must log in to view the page at {from}</p>

			<form onSubmit={handleSubmit}>
				<label>
					Email: <input name="Email" type="Email" />
				</label>{" "}

				<label>
					Password: <input name="Password" type="Password" />
				</label>{" "}


				<button type="submit">Login</button>
			</form>
		</div>
	);
}

export default Login;
