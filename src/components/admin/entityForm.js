import config from "../../services/config";

const EntityForm = ({ entityName }) =>
{
	const fields = Object.keys(config.entities[entityName].fields).map(field =>
	{

		const { type, reference } = config.entities[entityName].fields[field];

		switch (type)
		{
			case "string":
				return <label key={field} style={{ display: 'block', margin: '1em 0' }}>
					{field}:
					<input name={field} type="text" />
				</label>;

			case "number":
				return <label key={field} style={{ display: 'block', margin: '1em 0' }}>
					{field}:
					<input name={field} type="number" />
				</label>;

			case "ref":
				return <p key={field}>field {field} is referencing to {reference}</p>;

			default:
				return <p key={field}>field type for &quot;{field}&quot; not recognized</p>;
		}
	});

	const handleSubmit = (event) => {
		event.preventDefault()

		const form = new FormData(event.target)
		const values = Object.keys(config.entities[entityName].fields).map(field => {
			return form.get(field)
		})

		console.log({values})
	}

	return <form onSubmit={handleSubmit}>
		{fields}
		<button type="submit">Submit</button>
	</form>;
};

export default EntityForm;