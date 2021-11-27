import { useParams } from "react-router";
import { Link } from "react-router-dom";
import EntityForm from "../components/admin/entityForm";
import CrudProvider from "../components/providers/crud.provider";
import { useCRUD } from "../components/providers/crud.provider";
import config from '../services/config';

const Entity = () => {
	const crud1 = useCRUD();
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
			return <CrudProvider>
				<div className="text-xl flex flex-col bg-red-200 p-5" style={{ width: "80rem" }}>
					<p className="text-right"><Link className="bg-blue-500 rounded-lg p-3"
						to={`/admin/${entityName}/create`}>Add {entityName}</Link></p>
					{/* <Link to={`/admin/${entityName}/edit`}>Edit selected {entityName}</Link> */}
					<hr className="my-5" />
					<p className="mt-5">

						A table of all {entityName}s is going to be shown

						<div className="show-data ">

							<div className="grid grid-cols-3 divide-x ">
								<div>header table</div>
								<div> <h1></h1></div>
								<div> <h1></h1></div>
							</div>


							<div className="grid grid-cols-3 divide-x bg-gray-100">
								{
									crud1.tableValue && Object.values(crud1.tableValue).map((field, id) => {
										return (
											<div key={id}>{Object.values(field)}</div>
										)
									})
									//<div key={id}>{Object.values(field)}</div>
									//	console.log(field,"fieldddd")
									//console.log(Object.values(field), "fieldvallues")
									// 	{(Object.values(field)).map((e,id) =>{
									// 		return (<p key={id}>{e}fgdfdgf</p>)
									// })}
								}


								{/* <div></div>
								<div></div> */}
								{/* <h1>h</h1> */}
							</div>


						</div>


					</p>
				</div>
			</CrudProvider>;

		default:
			// get all of the entityName's rows from FB
			return <>
				<p>page not found ??</p>
			</>;
	}
};

export default Entity;