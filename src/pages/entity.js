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

		default:
			// get all of the entityName's rows from FB
			return <>
				<h1>hi</h1>
				<Link to={`/admin/${entityName}/create`}>Create new {entityName}</Link>{" - "}
				<Link to={`/admin/${entityName}/edit`}>Edit selected {entityName}</Link>
				<p>A table of all {entityName}s is going to be shown</p>
			</>;
	}
};

export default Entity;