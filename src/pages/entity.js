import { useParams } from "react-router";
import { Link } from "react-router-dom";
import EntityForm from "../components/admin/entityForm";
import CrudProvider from "../components/providers/crud.provider";
import { useCRUD } from "../components/providers/crud.provider";
import config from '../services/config';
import { title } from 'case'
import { useState } from "react";
import editPicture from '../images/edit.png'
import deletePicture from '../images/delete.png'
const Entity = () => {
    const crud = useCRUD();
    const [idEdit, setIdEdit] = useState(null);
    const { entityName, actionName } = useParams();

    switch (actionName) {

        case "create":
            return <CrudProvider>
                <EntityForm entityName={entityName} actionName={actionName} />
            </CrudProvider>;

        case "edit":
            return <CrudProvider>
                <EntityForm entityName={entityName} actionName={actionName} id={idEdit} />
            </CrudProvider>;

        case "remove":
            return <>
                <p>You removing the {entityName}</p>
            </>;
        case "list":
            if (entityName == "phase") {
                var crudFucntion = crud.allPhaseData
            }
            else if (entityName == "roadmap") {
                crudFucntion = crud.allRoadmapData
            }
            else {
                crudFucntion = crud.tableValue
            }

            return <CrudProvider>
                <div className="text-xl flex flex-col bg-red-200 p-5" style={{ width: "1400px" }}>

                    <p className="text-right">
                        <Link className="bg-blue-300 rounded-lg p-3 hover:bg-blue-600 hover:text-white shadow-xl "
                            to={`/admin/${entityName}/create`}>Add {title(entityName)}
                        </Link>
                    </p>

                    <hr className="my-5" />
                    <table className="bg-gray-100 rounded-3xl">

                        <thead>
                            <tr className="text-left">
                                {Object.keys(config.entities[entityName].fields).map((titleEntity, id) => (
                                    <th key={id}>{title(titleEntity)}</th>
                                ))}
                                <th className="w-8">edit</th>
                                <th className="w-8">delete</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                //crudFucntion :array of Object ,indexes show number of roadmap we created.
                                // id asli
                                crudFucntion && Object.values(crudFucntion).map((field, id) => {
                                    //field is an object that its key is filed of phase example.
                                    //genralName , leraning, roject, startdate

                                    const arrayoftitle = Object.keys(field)
                                    //  
                                    switch (entityName) {
                                        case "learning":
                                            return <>
                                                <tr key={id+3}>
                                                    {
                                                        arrayoftitle.map((a, index) => {
                                                            return <td key={index}>{field[a]}</td>
                                                        })

                                                    }
                                                    <td>
                                                        <button onClick={() => setIdEdit(id)} >
                                                            <Link to={`/admin/${entityName}/edit`}><img className="shadow-2xl" src={editPicture} width={30} height={30} alt="" /></Link>
                                                        </button>
                                                    </td>

                                                    <td>
                                                        <button onClick={() => crud.deleteData(id)} ><img className="shadow-2xl" src={deletePicture} width={30} height={30} alt="" /></button>
                                                    </td>
                                                    <img src="./delete.png" alt="" />
                                                </tr>

                                            </>
                                        case "project":
                                            return <>
                                                <tr key={id+1}>
                                                    {
                                                        arrayoftitle.map((a, index) => {
                                                            return <td key={index}>{field[a]}</td>
                                                        })

                                                    }
                                                    <td >
                                                        <button onClick={() => setIdEdit(id)} >
                                                            <Link to={`/admin/${entityName}/edit`}>
                                                                <img className="shadow-2xl" src={editPicture} width={30} height={30} alt="" />
                                                            </Link>
                                                        </button>
                                                    </td>

                                                    <td >
                                                        <button onClick={() => crud.deleteData(id)} ><img className="shadow-2xl" src={deletePicture} width={30} height={30} alt="" /></button>
                                                    </td>
                                                    <img src="./delete.png" alt="" />
                                                </tr>

                                            </>

                                        case "phase":
                                            return <>
                                                <tr>
                                                    <td >{field.generalName}</td>

                                                    <td>
                                                        {
                                                            field.learning.map((x, id1) => {
                                                                return <tr key={id1}>{x.name}</tr>
                                                            })
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            field.project.map((x, id2) => {
                                                                return <tr key={id2}>{x.name}</tr>
                                                            })
                                                        }
                                                    </td>
                                                    <td>{field.startDate}</td>

                                                    <td>
                                                        <button onClick={() => setIdEdit(id)} >
                                                            <Link to={`/admin/${entityName}/edit`}><img className="shadow-2xl" src={editPicture} width={30} height={30} alt="" /></Link>
                                                        </button>
                                                    </td>

                                                    <td>
                                                        <button onClick={() => crud.deleteData(id)} ><img className="shadow-2xl" src={deletePicture} width={30} height={30} alt="" /></button>
                                                    </td>
                                                </tr>
                                            </>

                                        case "roadmap":
                                            return <>
                                                <tr>
                                                    <td >{field.name}</td>
                                                    <td>
                                                        {
                                                            field.phase.map((x, id3) => {
                                                                return <tr key={id3}>{x.generalName}</tr>
                                                            })
                                                        }
                                                    </td>
                                                    <td>
                                                        <button onClick={() => setIdEdit(id)} >
                                                            <Link to={`/admin/${entityName}/edit`}><img className="shadow-2xl" src={editPicture} width={30} height={30} alt="" /></Link>
                                                        </button>
                                                    </td>

                                                    <td>
                                                        <button onClick={() => crud.deleteData(id)} ><img src={deletePicture} width={30} height={30} alt="" /></button>
                                                    </td>
                                                </tr>
                                            </>

                                        default:
                                            break;
                                    }
                                })
                            }
                        </tbody>
                    </table>
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