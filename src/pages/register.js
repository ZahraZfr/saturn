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
				navigate("/admin", { replace: true });
			})
		} catch (e) {
			setError(e.message)
		}
	};

	return (
		<div className="text-3xl text-center pt-14 rounded-full ">
			<p className="text-red-500 text-base text-2xl">{error}</p>

			<form className="flex justify-center mx-auto rounded-2xl flex-col mt-6 w-1/3 bg-gray-200 shadow-xl" onSubmit={handleSubmit}>
				<label className="mb-5">
					Email: <input className="shadow-2xl bg-white w-3/5 py-5 px-3 rounded-2xl mx-8 mt-28 mb-2" name="email" type="email" required />
				</label>
				<label>
					Password: <input className="shadow-2xl bg-white w-3/5 py-5 px-3 rounded-2xl mx-8 mb-5" name="password" type="password" required />
				</label>
				<button className="mb-28 flex items-center justify-center mt-7 mx-auto hover:text-white bg-blue-400 hover:bg-blue-800 px-36 py-5 w-32 rounded-full" type="submit" >Register</button>
			</form>
		</div>
	);
};

export default Register;