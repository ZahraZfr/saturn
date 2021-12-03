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
                            to={`/admin/${entityName}/create`}>Add{entityName}
                        </Link>
                    </p>

                    <hr className="my-5" />
                    <table>
                        <thead>
                            <tr className="text-left">
                                {Object.keys(config.entities[entityName].fields).map((titleEntity, id) => (
                                    <th key={id}>{title(titleEntity)}</th>
                                ))}
                            </tr>
                        </thead>
                        {/* <tbody>
                            <tr>
                                {crud.tableValue && Object.values(crud.tableValue).map((field) => {
                                    <span>
                                        {Object.values(field).map((entity, id) => {
                                            <td key={id}>hi{title(entity)}</td>
                                        })}
                                    </span>
                                })}
                            </tr>
                        </tbody> */}
                    </table>

                    <div className="show-data">
                        <div className="divide-x bg-gray-100 learningandproject">
                            {

                                crudFucntion && Object.values(crudFucntion).map((field, id) => {
                                    return (
                                        <>
                                            <div className="relative">
                                                <span key={id}>
                                                    {
                                                        Object.values(field).map((entity, id) => {
                                                            return entity.map((entityField) => {
                                                                switch (typeof entityField) {
                                                                    case "string":
                                                                        return <span className="w-96 pr-40 mr-8 bg-gray-300" key={id}>{title(entityField)}</span>
                                                                    case "object":
                                                                        return <span className="w-96 pr-40 mr-8 bg-gray-300" key={id}>{title(Object.values(entityField)[0])}</span>
                                                                    default:
                                                                        break;
                                                                }
                                                            })

                                                        })
                                                    }
                                                </span>

                                                <span className="absolute right-0">

                                                    <button onClick={() => setIdEdit(id)} className="bg-green-600">
                                                        <Link to={`/admin/${entityName}/edit`}>edit</Link>
                                                    </button>

                                                    <button onClick={() => crud.deleteData(id)} className="bg-red-500">delete</button>
                                                </span>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
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