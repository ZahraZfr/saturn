import { Route, Link } from "react-router-dom";

const Index = () => {
	return <>
		<div className="flex m-auto w-90 justify-center text-4xl pt-10">
			<Link className="m-5 bg-gray-300 p-5 rounded-full" to="/login">Login</Link>
	
		</div>

		<div className="text-7xl p-14 bg-red-400 text-center">
			Roadmap , Read crud
		</div>
	</>
}
export default Index;