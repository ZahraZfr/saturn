import { Route, Link } from "react-router-dom";
import goal from '../images/goal.png'

//local3000//
const Index = () => {
	return <>
		<div className=" pt-20 p-14 text-center text-red-400 ">
			<h1 className="font-bold text-5xl">Welcome to your Roadmap</h1>
			<h2 className="text-3xl mt-5">login and Create Your own Roadmap!</h2>
		</div>
		<img src={goal} width={300} height={300} alt="" className="flex justify-center mx-auto" />
		<div className="flex justify-center w-90 text-4xl  pt-10">
			<Link className="shadow-2xl mx-5 mt-5  px-32 text-center font-semibold p-8 rounded-full flex justify-center items-center text-justify bg-green-300 hover:bg-green-600 hover:text-white" to="/login">Login</Link>
		</div>
		<div className="flex justify-center w-90 text-4xl  pt-10">
			<Link className="shadow-2xl  text-center font-semibold py-8 px-28 rounded-full flex justify-center items-center text-justify bg-blue-300 hover:bg-blue-600 hover:text-white" to="/register" >Register</Link>
		</div>
	</>
}
export default Index;