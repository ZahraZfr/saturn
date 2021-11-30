import config from "../../services/config";
import { useCRUD } from "../providers/crud.provider";
import { title } from 'case'
import Select from 'react-select'
import { useEffect, useState } from "react";

const EntityForm = ({ entityName, actionName, id }) => {
	const crud = useCRUD();
	const Updatedfields = Object.keys(config.entities[entityName].fields).map(field => {

		let field2 = ''
		if (actionName != "create") {
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
				// const options = [
				// 	{ value: 'id', label: 'chocolate' },
				// 	{ value: 'id', label: 'Strawberry' },
				// 	{ value: 'id', label: 'Vanilla' }
				// ]
				// let options = []
				const [options, setOptions] = useState([]);
				useEffect(() => {
					async function refData() {
						let mh = await crud.learningData(reference)
						let option = Object.keys(mh).map((keymh) => {
							let Valuemh = Object.values(mh[keymh])[0][0]
							return { value: keymh, label: Valuemh }
						})
						setOptions(option)
						console.log(option);
					}
					refData()
				}, []);
				

				return <label className="text-lg font-semibold" key={field} style={{ display: 'block', margin: '1em 0' }}>
					Choosing {field} options {reference}
					<Select
						name={field}
						isMulti
						options={options}
						className="basic-multi-select"
						classNamePrefix="select"
					/>

				</label>;
			default:
				return <p key={field}>field type for &quot;{field}&quot; not recognized</p>;
		}
	});

	const handleSubmit = (event) => {
		event.preventDefault()
		const form = new FormData(event.target)
		const values = Object.keys(config.entities[entityName].fields).reduce((values, field) => {
			const value = form.get(field)
			values[field] = value
			return values
		}, {})
		return crud[actionName](values, id)
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