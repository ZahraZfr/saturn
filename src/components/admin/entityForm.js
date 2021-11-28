import config from "../../services/config";
import CrudProvider, { useCRUD } from "../providers/crud.provider";
import { title } from 'case'
import { useParams } from "react-router";

const EntityForm = ({ entityName, actionName, id }) => {
	// console.log("show id", id);
	// console.log("id entity",id);
	// const {id}= useParams()
	const crud = useCRUD();
	const fields = Object.keys(config.entities[entityName].fields).map(field => {
		
		// console.log(Object.values(crud.tableValue)[id][field]);
		let field2 = ''
		if(actionName!="create"){
			console.log(id);
			field2 = Object.values(crud.tableValue)[id][field]

		}
	

		const { type, reference } = config.entities[entityName].fields[field];
		switch (type) {
			case "string":
				return <label className="text-lg font-semibold" key={field}
					style={{ display: 'block', margin: '1em 0' }}>
					{title(field)}:
					<input className="ml-5 rounded-lg shadow-lg pl-4 outline-none" placeholder={field2}
						name={field} type="text" required />
				</label>;

			case "number":
				return <label className="text-lg font-semibold" key={field} style={{ display: 'block', margin: '1em 0' }}>
					{title(field)}:
					<input className="ml-5 rounded-lg shadow-lg pl-4 outline-none" placeholder={field2}
						name={field} type="number" required />
				</label>;

			case "ref":
				return <p key={field}>field {field} is referencing to {reference}</p>;

			default:
				return <p key={field}>field type for &quot;{field}&quot; not recognized</p>;
		}
	});

	// const updateFields = crud.tableValue && Object.values(crud.tableValue).map((field, id) => {
	// 	console.log(Object.values(crud.tableValue)[id]);
	// 	return (
	// 		<>
	// 			<div className="relative">

	// 				<div  key={id}>{Object.values(field).map((entity, id) => {
	// 					// console.log(entity);
	// 					return (<>
	// 						<input className="w-96 pr-40 mr-8 bg-gray-300" placeholder={title(entity)}
	// 						 key={id}></input>
	// 					</>)
	// 				})}</div>
	// 			</div>
	// 		</>
	// 	)
	// })
	// console.log(Object.values(crud.tableValue)[id]);
	// const updateFields = crud.tableValue && Object.values(Object.values(crud.tableValue)[id]).map((field, id) => {
	// 	return Object.keys(config.entities[entityName].fields).map(field1 => {

	// 		return <input name={field1} key={id} className="w-96 pr-40 mr-8 bg-gray-300" placeholder={title(field)} />
	// 	})
	// })
	console.log("iddddd", id);

	if (actionName == "create") {
		return (
			<>

				<form className="formCrud border border-black rounded-lg p-5" onSubmit={crud.create}>
					{fields}

					<button type="submit">{actionName}</button>
				</form>
			</>
		)

	}
	else {
		return (
			<>
				<form className="formCrud border border-black rounded-lg p-5" onSubmit={crud.edit(id)}>
					{fields}
					<button type="submit">{actionName}</button>
				</form>
			</>
		)
	}

	// return (
	// 	<>

	// 		<form className="formCrud border border-black rounded-lg p-5" onSubmit={crud.create}>
	// 			{fields}

	// 			<button type="submit">{actionName}</button>
	// 		</form>


	// 		<form className="formCrud border border-black rounded-lg p-5" onSubmit={crud.edit(id)}>
	// 			{fields}
	// 			<button type="submit">{actionName}</button>
	// 		</form>


	// 	</>
	// )
};

export default EntityForm;