import React, { useState, useEffect } from 'react';
import { getDatabase, get, ref, set, push, child, update, remove } from 'firebase/database';
import { db } from "../services/firebase";
const dbRef = ref(getDatabase());


const ContactForm = () => {
    const [tableValue, setTableValue] = useState([])

    const handleFormSubmit = (e) => {
        // const [taskname, setTaskName] = useState('');

        e.preventDefault();

        let formData = new FormData(e.currentTarget)
        let duration = formData.get('duration')
        let nameOfPro = formData.get('nameOfPro')

        const phase = {
            duration: duration,
            nameOfProject: nameOfPro,
        }


        push(ref(db, 'phase/id' + '5'), phase)
            .then(() => {
                alert("data successful")
            })
            .catch((error) => {
                alert("unsuccessful" + error)
            })
    }



    const updateData = () => {

        const updatedPhase = {
            duration: 'UP',
            nameOfProject: 'UP',
        }

        update(ref(db, 'phase/id' + '3'), updatedPhase)
            .then(() => {
                alert("data successful")
            })
            .catch((error) => {
                alert("unsuccessful" + error)
            })

    }
    const showData = () => {

        get(child(dbRef, 'phase/id3')).then((snapshot) => {
            if (snapshot.exists()) {
                setTableValue(snapshot.val())
                console.log(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const deleteData = () => {
        remove(ref(db, 'phase/id' + '3'))
            .then(() => {
                alert("data successful remove")
            })
            .catch((error) => {
                alert("unsuccessful" + error)
            })
    }



    return (
        <div className="w-full max-w-3xl m-auto mt-10">
            <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
            </svg>

            <form autoComplete="off" onSubmit={handleFormSubmit} className="bg-blue-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="duration time ex 30 days" type="text" name="duration" />
                </div>
                <div className="mt-6">
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="name of phase ex First evaluation" type="text" name="nameOfPro" />
                </div>
                <div className="mt-6">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">insert</button>
                </div>

            </form>

            <div className="mt-6">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="" onClick={deleteData}>delete</button>
            </div>

            <div className="mt-6">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="" onClick={showData} >show</button>
            </div>

            <div className="mt-6">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="" onClick={updateData} >update</button>
            </div>



            <div className="show-data ">

                <div className="grid grid-cols-3 divide-x bg-gray-100">
                    <div>id</div>
                    <div>duration</div>
                    <div>name of project</div>
                </div>

                <div className="grid grid-cols-3 divide-x ">
                    <div>id</div>
                    <div> <h1>{tableValue.duration}</h1></div>
                    <div> <h1>{tableValue.nameOfProject}</h1></div>
                </div>

            </div>
        </div>
    );
}
export default ContactForm;

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

/////////////////////
<tr key={id}>
{
    Object.values(field).map((entity, id) => {
        // console.log("fied",field);
        //  console.log("field",field.learning);
        return entity.map((entityField, id) => {
            // console.log(id);

            switch (typeof entityField) {
                case "string":
                    return <td className="w-96 pr-40 mr-8 bg-red-100" key={id}>{title(entityField)}</td>

                case "object":
                    return <td key={id}>
                        <div className=" w-96 pr-40 mr-8 bg-gray-300" key={id}>{title(Object.values(entityField)[0])}</div>
                    </td>

                default:
                    break;
            }
        })

    })
}
</tr>

//////////////////

return (
    <>
        <tr key={id}>
            {
                
                (field.learning).map((entity) => {

                    return entity.name.map((entityField, id) => {
                        switch (typeof entityField) {
                            case "string":
                                return <div className="w-96 pr-40 mr-8 bg-red-100" key={id}>{title(entityField)}</div>

                            default:
                                break;
                        }
                    })

                })
            }
        </tr>
        {/* 
        <span className="absolute right-0">

            <button onClick={() => setIdEdit(id)} className="bg-green-600">
                <Link to={`/admin/${entityName}/edit`}>edit</Link>
            </button>

            <button onClick={() => crud.deleteData(id)} className="bg-red-500">delete</button>
        </span> */}

    </>
)
///////////////////
{
    crudFucntion && Object.values(crudFucntion).map((field, id) => {
        return Object.keys(field).map((a) => {

            if (a == "generalName") {
                return (
                    <>
                        <td key={id}>
                            {

                                (field[a]).map((entity) => {

                                    return <div className="w-96 pr-40 mr-8 bg-red-100" key={id}>{title(entity)}</div>



                                })
                            }
                        </td>


                    </>
                )
            }

            else if (a == "learning") {
                return (
                    <>
                        <td key={id}>
                            {

                                (field[a]).map((entity) => {

                                    return entity.name.map((entityField, id) => {
                                        switch (typeof entityField) {
                                            case "string":
                                                return <div className="w-96 pr-40 mr-8 bg-red-100" key={id}>{title(entityField)}</div>

                                            default:
                                                break;
                                        }
                                    })

                                })
                            }
                        </td>


                    </>
                )
            }

            else if (a == "project") {
                return (
                    <>
                        <td key={id}>
                            {

                                (field[a]).map((entity) => {

                                    return entity.name.map((entityField, id) => {
                                        switch (typeof entityField) {
                                            case "string":
                                                return <div className="w-96 pr-40 mr-8 bg-red-100" key={id}>{title(entityField)}</div>

                                            default:
                                                break;
                                        }
                                    })

                                })
                            }
                        </td>


                    </>
                )
            }

            else if (a == "phase") {
                console.log(a);
                return (
                    <>
                        <td key={id}>
                            {
                                (field[a]).map((entity) => {
                                    return entity.generalName.map((entityField, id) => {
                                        switch (typeof entityField) {
                                            case "string":
                                                return <div className="w-96 pr-40 mr-8 bg-red-100" key={id}>{title(entityField)}</div>

                                            default:
                                                break;
                                        }
                                    })

                                })
                            }
                        </td>
                    </>
                )
            }

            else if (a == "projectDuration") {
                return (
                    <>
                        <td key={id}>
                            {

                                (field[a]).map((entity) => {

                                    return <div className="w-96 pr-40 mr-8 bg-red-100" key={id}>{title(entity)}</div>



                                })
                            }
                        </td>


                    </>
                )
            }

            else {
                return (
                    <>
                        <td key={id}>
                            {

                                (field[a]).map((entity) => {

                                    return <div className="w-96 pr-40 mr-8 bg-red-100" key={id}>{title(entity)}</div>



                                })
                            }
                        </td>


                    </>
                )
            }
        })


        })
}


/////////////////////
{
    Object.values(field).map((entity) => {
        
        
         return entity.map((entityField,index) => {                                                    

            switch (typeof entityField) {
                case "string":
                    return <td className="w-96 pr-40 mr-8 bg-red-100" key={id}>{title(entityField)}</td>

                case "object":
                    return Object.keys(field).map((a) => {
                        
                        if (a == "learning") {
                            return (
                                <>
                                    <td >
                                        {
                                            (field[a]).map((entity,id) => {
                                                return entity.name.map((entityField) => {
                                                    
                                                    return <div key={id} className="w-96 pr-40 mr-8 bg-red-100" >{title(entityField)}</div>
                                                })

                                            })
                                        }
                                    </td>
                                </>
                            )
                            
                        }
                        

                        // else if (a == "phase") {
                        //     return (
                        //         <>
                        //             <td key={id}>
                        //                 {
                        //                     (field[a]).map((entity) => {
                        //                         return entity.generalName.map((entityField, id) => {
                        //                             switch (typeof entityField) {
                        //                                 case "string":
                        //                                     return <div className="w-96 pr-40 mr-8 bg-red-100" key={id}>{title(entityField)}</div>

                        //                                 default:
                        //                                     break;
                        //                             }
                        //                         })

                        //                     })
                        //                 }
                        //             </td>
                        //         </>
                        //     )
                        // }
                        // else
                        //     return <td key={id}>
                        //         <div className=" w-96 pr-40 mr-8 bg-gray-300" key={id}>{title(Object.values(entityField)[0])}</div>
                        //     </td>




                    })


                default:
                    break;
            }
        })

    })
}