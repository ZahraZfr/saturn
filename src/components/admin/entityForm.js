import config from "../../services/config";
import { useCRUD } from "../providers/crud.provider";



const EntityForm = ({ entityName }) => {
	const fields = Object.keys(config.entities[entityName].fields).map(field => {

		const { type, reference } = config.entities[entityName].fields[field];


		switch (type) {
			case "string":
				return <label className="text-lg font-semibold" key={field} 
				style={{ display: 'block', margin: '1em 0' }}>
					{field}:
					<input className="ml-5 rounded-lg shadow-lg pl-4 outline-none" name={field} type="text" required />
				
				</label>;

			case "number":
				return <label className="text-lg font-semibold" key={field} style={{ display: 'block', margin: '1em 0' }}>
					{field}:
					<input className="ml-5 rounded-lg shadow-lg pl-4 outline-none" name={field} type="number" required />
				</label>;

			case "ref":
				return <p key={field}>field {field} is referencing to {reference}</p>;

			default:
				return <p key={field}>field type for &quot;{field}&quot; not recognized</p>;
		}
	});

	const crud = useCRUD();

	// const handleSubmit = (event)=>{
	// 	if event.target.values == 'create'
	// }

	// const create = (event) => {
	// 	event.preventDefault()

	// 	const form = new FormData(event.target)
	// 	const values = Object.keys(config.entities[entityName].fields).map(field => {
	// 		return form.get(field)
	// 	})
	// 	push(ref(db, 'phase/id' + '7'), values)
	// 		.then(() => {
	// 			alert("data successful")
	// 		})
	// 		.catch((error) => {
	// 			alert("unsuccessful" + error)
	// 		})
	// };

	// const updateData = () => {
	//     const updatedPhase = {
	//         duration: 'UP',
	//         nameOfProject: 'UP',
	//     }

	//     update(ref(db, 'phase/id' + '3'), updatedPhase)
	//         .then(() => {
	//             alert("data successful")
	//         })
	//         .catch((error) => {
	//             alert("unsuccessful" + error)
	//         })

	// }

	// const showData = () => {

	//     get(child(dbRef, 'phase/id3')).then((snapshot) => {
	//         if (snapshot.exists()) {
	//             setTableValue(snapshot.val())
	//             console.log(snapshot.val());
	//         } else {
	//             console.log("No data available");
	//         }
	//     }).catch((error) => {
	//         console.error(error);
	//     });
	// }


	// const showData = () => {

	// 	get(child(dbRef, 'phase/id3')).then((snapshot) => {
	// 		if (snapshot.exists()) {
	// 			setTableValue(snapshot.val())
	// 			console.log(snapshot.val());
	// 		} else {
	// 			console.log("No data available");
	// 		}
	// 	}).catch((error) => {
	// 		console.error(error);
	// 	});
	// }

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