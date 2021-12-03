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
                                <th>delete</th>
                                <th>edit</th>
                            </tr>

                        </thead>

                        <tbody>
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