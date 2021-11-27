import config from "../../services/config";
import { useCRUD } from "../providers/crud.provider";
import { title } from 'case'

const EntityForm = ({ entityName }) => {
	const fields = Object.keys(config.entities[entityName].fields).map(field => {
		const { type, reference } = config.entities[entityName].fields[field];



		switch (type) {
			case "string":
				return <label className="text-lg font-semibold" key={field}
					style={{ display: 'block', margin: '1em 0' }}>
					{title(field)}:
					<input className="ml-5 rounded-lg shadow-lg pl-4 outline-none" name={field} type="text" required />

				</label>;

			case "number":
				return <label className="text-lg font-semibold" key={field} style={{ display: 'block', margin: '1em 0' }}>
					{title(field)}:
					<input className="ml-5 rounded-lg shadow-lg pl-4 outline-none" name={field} type="number" required />
				</label>;

			case "ref":
				return <p key={field}>field {field} is referencing to {reference}</p>;

			default:
				return <p key={field}>field type for &quot;{field}&quot; not recognized</p>;
		}
	});

	const crud = useCRUD();



	return (
		<>
			<form className="formCrud border border-black rounded-lg p-5" onSubmit={crud.create}>
				{fields}
				<button type="submit">create</button>
			</form>
		</>
	)
};

export default EntityForm;