import { useParams } from "react-router"
import { Link } from "react-router-dom"
import config from "../../services/config";

const Admin = ({children}) => {

	const {entityName, actionName} = useParams()

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
			`
		}}>
			<div className="navbar" style={{
				gridArea: 'navbar',
				backgroundColor: '#ececec'
			}}>
				<ul>
					<li style={{display: 'inline-block'}}>
						<Link to={`/admin/${entityName}/list`}>{entityName}</Link>
					</li>{" / "}
					<li style={{display: 'inline-block'}}>{actionName}</li>
				</ul>
			</div>
			<div className="sidebar" style={{
				gridArea: 'sidebar',
				backgroundColor: '#e0e0e0'
			}}>
				<ul>
					{
						Object.keys(config.entities)
							.map(key => <li key={key}><Link to={`/admin/${key.toLowerCase()}/list`}>{key}</Link></li>)
					}
				</ul>
			</div>
			<div className="content" style={{
				gridArea: 'content'
			}}>
				{children}
			</div>
		</div>
	)
};

export default Admin;
