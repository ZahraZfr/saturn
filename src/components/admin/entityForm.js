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

			case "date":
				return <label className="text-lg font-semibold" key={field} style={{ display: 'block', margin: '1em 0' }}>
					{title(field)}:
					<input className="ml-5 rounded-lg shadow-lg pl-4 outline-none" placeholder={field2}
						name={field} type="date" required />
				</label>;

			case "ref":
				//Template of options:
				// const options = [
				// 	{ value: 'id', label: 'chocolate' },
				// ]
				const [options, setOptions] = useState([]);
				useEffect(() => {
					async function refData() {
						let refData = await crud.learningData(reference)
						let option = Object.keys(refData).map((keyRef) => {
							let ValueRef = Object.values(refData[keyRef])[0][0]
							return { value: keyRef, label: ValueRef }
						})
						setOptions(option)
					}
					refData()
				}, []);


				return <label className="text-lg font-semibold" key={field} style={{ display: 'block', margin: '1em 0' }}>
					Choosing {reference}
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
			const value = form.getAll(field)
			values[field] = value
			return values
		}, {})
		return crud[actionName](values, id)
	}

	return (
		<>
			<form className="formCrud border border-black rounded-lg p-5" onSubmit={handleSubmit}>
				{Updatedfields}
				<button className="shadow-2xl bg-gray-300 hover:bg-gray-500 hover:text-white font-semibold px-10 py-2 rounded-3xl text-xl"  type="submit">{actionName}</button>
			</form>
		</>
	)
};

export default EntityForm;