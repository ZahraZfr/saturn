import config from "../../services/config";
import CrudProvider, { useCRUD } from "../providers/crud.provider";
import { title } from 'case'
import { Navigate, useParams } from "react-router";

const EntityForm = ({ entityName, actionName, id }) => {
	const crud = useCRUD();
	const Updatedfields = Object.keys(config.entities[entityName].fields).map(field => {
		
		// console.log(Object.values(crud.tableValue)[id][field]);
		let field2 = ''
		if(actionName!="create"){
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

	// if (actionName == "create") {
	// 	return (
	// 		<>

	// 			<form className="formCrud border border-black rounded-lg p-5" onSubmit={crud.create}>
	// 				{Updatedfields}

	// 				<button type="submit">{actionName}</button>
	// 			</form>
	// 		</>
	// 	)

	// }
	// else {
	// 	return (
	// 		<>
	// 			<form className="formCrud border border-black rounded-lg p-5" onSubmit={crud.edit(id)}>
	// 				{Updatedfields}
	// 				<button type="submit">{actionName}</button>
	// 			</form>
	// 		</>
	// 	)
	// }
	// crud[actionName](id)

	const handleSubmit = (event) =>{
		event.preventDefault()
        const form = new FormData(event.target)
        const values = Object.keys(config.entities[entityName].fields).reduce((values, field) => {
            const value = form.get(field)
            values[field] = value
            return values
        }, {})
		return crud[actionName](values,id)


	}

	return (
		<>
			<form className="formCrud border border-black rounded-lg p-5" onSubmit={handleSubmit}>
				{Updatedfields}

				<button type="submit">{actionName}</button>
			</form>

		</>
	)
};

export default EntityForm;