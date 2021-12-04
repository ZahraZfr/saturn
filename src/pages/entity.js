import { useParams } from "react-router";
import { Link } from "react-router-dom";
import EntityForm from "../components/admin/entityForm";
import CrudProvider from "../components/providers/crud.provider";
import { useCRUD } from "../components/providers/crud.provider";
import config from '../services/config';
import { title } from 'case'
import { useState } from "react";

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
                        <Link className="bg-blue-500 rounded-lg p-3"
                            to={`/admin/${entityName}/create`}>Add {title(entityName)}
                        </Link>
                    </p>

                    <hr className="my-5" />
                    <table>

                        <thead>
                            <tr className="text-left">
                                {Object.keys(config.entities[entityName].fields).map((titleEntity, id) => (
                                    <th key={id}>{title(titleEntity)}</th>
                                ))}
                                <th>edit</th>
                                <th>delete</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                //crudFucntion :array of Object ,indexes show number of roadmap we created.
                                crudFucntion && Object.values(crudFucntion).map((field, id) => {
                                    //field is an object that its key is filed of phase example.
                                    //genralName , leraning, roject, startdate
                                   
                                    const arrayoftitle = Object.keys(field)
//  
                                    switch (entityName) {
                                        case "learning":
                                        case "project":
                                            return <>
                                                <tr>
                                                    {
                                                        arrayoftitle.map((a) => {
                                                            return <td key={id}>{field[a]}</td>
                                                        })

                                                    }
                                                    <td>
                                                        <button onClick={() => setIdEdit(id)} className="bg-green-600 px-8 py-2 rounded-md">
                                                            <Link to={`/admin/${entityName}/edit`}>edit</Link>
                                                        </button>
                                                    </td>

                                                    <td>
                                                        <button onClick={() => crud.deleteData(id)} className="bg-red-500 px-8 py-2 rounded-md">delete</button>
                                                    </td>
                                                    <img src="./delete.png" alt="" />
                                                </tr>

                                            </>

                                        case "phase":
                                            return <>
                                                <tr>
                                                    <td key={id}>{field.generalName}</td>

                                                    <td key={id}>
                                                        {
                                                            field.learning.map((x) => {
                                                                return <tr key={id}>{x.name}</tr>
                                                            })
                                                        }
                                                    </td>
                                                    <td key={id}>
                                                        {
                                                            field.project.map((x) => {
                                                                return <tr key={id}>{x.name}</tr>
                                                            })
                                                        }
                                                    </td>
                                                    <td key={id}>{field.startDate}</td>

                                                    <td>
                                                        <button onClick={() => setIdEdit(id)} className="bg-green-600 px-8 py-2 rounded-md">
                                                            <Link to={`/admin/${entityName}/edit`}>edit</Link>
                                                        </button>
                                                    </td>

                                                    <td>
                                                        <button onClick={() => crud.deleteData(id)} className="bg-red-500 px-8 py-2 rounded-md ">delete</button>
                                                    </td>
                                                </tr>
                                            </>

                                        case "roadmap":
                                            return <>
                                                <tr>
                                                    <td key={id}>{field.name}</td>
                                                    <td key={id}>
                                                        {
                                                            field.phase.map((x) => {
                                                                return <tr key={id}>{x.generalName}</tr>
                                                            })
                                                        }
                                                    </td>
                                                    <td>
                                                        <button onClick={() => setIdEdit(id)} className="bg-green-600 px-8 py-2 rounded-md">
                                                            <Link to={`/admin/${entityName}/edit`}>edit</Link>
                                                        </button>
                                                    </td>

                                                    <td>
                                                        <button onClick={() => crud.deleteData(id)} className="bg-red-500 px-8 py-2 rounded-md">delete</button>
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