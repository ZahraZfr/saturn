import { useParams } from "react-router";
import { Link } from "react-router-dom";
import EntityForm from "../components/admin/entityForm";
import CrudProvider from "../components/providers/crud.provider";

const Entity = () => {

	const { entityName, actionName } = useParams();

	switch (actionName) {
		case "create":
			return <CrudProvider>
				<EntityForm entityName={entityName} />
			</CrudProvider>;

		case "edit":
			return <>
				<EntityForm entityName={entityName} />
			</>;

		case "remove":
			return <>
				<p>You removing the {entityName}</p>
			</>;
		case "list":
			return <>
				<div className="text-xl flex flex-col bg-red-200 p-5" style={{width:"80rem"}}>
					<p className="text-right"><Link className="bg-blue-500 rounded-lg p-3" 
					to={`/admin/${entityName}/create`}>Add {entityName}</Link></p>
					{/* <Link to={`/admin/${entityName}/edit`}>Edit selected {entityName}</Link> */}
					<hr className="my-5"/>
					<p className="mt-5">A table of all {entityName}s is going to be shown</p>
				</div>
			</>;

		default:
			// get all of the entityName's rows from FB
			return <>
				<p>page not found ??</p>
			</>;
	}
};

export default Entity;