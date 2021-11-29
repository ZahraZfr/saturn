import React, { createContext, useState, useEffect, useContext } from 'react';
import { getDatabase, get, ref, set, push, child, update, remove } from 'firebase/database';
import { db } from "../../services/firebase"
import config from '../../services/config';
import { useParams } from "react-router";

const dbRef = ref(getDatabase());
const CRUDContext = createContext(null);

const CrudProvider = ({ children }) => {

    const { entityName } = useParams();
    const [tableValue, setTableValue] = useState([])

    const [change, setChange] = useState(0);


    const create = (values, id) => {
        push(ref(db, `${entityName}`), values)
            .then(() => {
                alert("data successful")
                setChange(change + 1)
            })
            .catch((error) => {
                alert("unsuccessful" + error)
            })
        setChange(change + 1)
    }
    const edit = (values, id) => {
        const idEntityName = Object.keys(tableValue)[id]
        update(ref(db, `${entityName}` + '/' + `${idEntityName}`), values)
            .then(() => {
                alert("data successful update")
            })
            .catch((error) => {
                alert("unsuccessful" + error)
            })
        setChange(change + 1)
    }

    const deleteData = (id) => {
        const idEntityName = Object.keys(tableValue)[id]
        remove(ref(db, `${entityName}` + '/' + `${idEntityName}`))
            .then(() => {
                alert("data successful remove")
            })
            .catch(() => {
                alert("unseccesful")
            })
        setChange(change + 1)
    }

    useEffect(() => {
        get(child(dbRef, `${entityName}`)).then((data) => {
            if (data.exists()) {
                setChange(change+1)
                setTableValue(data.val())         
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
       
    }, [entityName, change]);


    return (
        <CRUDContext.Provider
            value={{
                create,
                edit,
                deleteData,
                tableValue,

            }}
        >
            {children}
        </CRUDContext.Provider>
    );
}
export default CrudProvider;


export const useCRUD = () => useContext(CRUDContext);