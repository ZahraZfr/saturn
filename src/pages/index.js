import { Route, Link } from "react-router-dom";
import goal from '../images/goal.png'
const Index = () => {
	return <>
		

		<div className=" pt-20 p-14 text-center text-red-400 ">
			<h1 className="font-bold text-5xl">Welcome to your Roadmap</h1>
			<h2 className="text-3xl mt-5">login and Create Your own Roadmap!</h2>
		</div>
		<img src={goal} width={300} height={300} alt="" className="flex justify-center mx-auto"/>
		<div className="flex justify-center w-90 text-4xl  pt-10">
			<Link className=" shadow-2xl m-5 bg-gray-300 px-32 text-center font-semibold p-8 rounded-full flex justify-center items-center text-justify" to="/login">Login</Link>
	
		</div>
	</>
}
export default Index;