import { useParams } from "react-router"
import { Link } from "react-router-dom"
import config from "../../services/config";
import { auth } from '../../services/firebase'



const Admin = ({ children }) => {



	// const auth = useAuth()

	const logout = async () => {
		try {
			await auth.signOut(() => {
				console.log("sign out");
			
			});
		} catch (error) {
			console.log('error signing out: ', error);
		}
	}

	const { entityName, actionName } = useParams()

	return (
		<div style={{
			display: 'grid',
			minHeight: '100vh',
			gridTemplateColumns: '300px 1fr',
			gridTemplateRows: '64px 1fr',
			gap: '0px 0px',
			gridTemplateAreas: `
				'sidebar navbar'
				'sidebar content'
			`}}>

			<div className="navbar" style={{
				gridArea: 'navbar',
				backgroundColor: '#ececec'
			}}>
				<ul className="px-5 py-2">
					{/* <li className="text-xl text-gray-900" style={{ display: 'inline-block' }}>
						<Link to={`/admin/${entityName}/list`}>{entityName}</Link>
					</li>{" / "}
					<li className="text-xl text-gray-900" style={{ display: 'inline-block' }}>{actionName}</li>
				 */}

					<div>
						< Link to={`/admin`} className="px-8 py-2 text-xl bg-yellow-500 hover:bg-yellow-600 rounded-2xl fixed right-40 top-2  text-white shadow-lg">Home</Link>
					</div>
					<div>
						<button className="px-8 py-2 text-xl bg-red-500 hover:bg-red-600 rounded-2xl fixed top-2 right-5 text-white shadow-lg" onClick={logout}>Log out</button>
					</div>

				</ul>
			</div>

			<div className="sidebar" style={{
				gridArea: 'sidebar',
				backgroundColor: '#e0e0e0'
			}}>
				<ul>
					{
						Object.keys(config.entities)
							.map(key => <li className="pl-5 py-7 text-xl shadow-xl font-semibold pb-2 hover:bg-gray-400 hover:text-white" key={key}><Link to={`/admin/${key.toLowerCase()}/list`}>{key}</Link></li>)
					}
				</ul>
			</div>

			<div className="content " style={{
				gridArea: 'content',
				maxWidth: '800px',
				marginLeft: '1em'

			}}>{children}
			</div>



		</div>
	)
};

export default Admin;
