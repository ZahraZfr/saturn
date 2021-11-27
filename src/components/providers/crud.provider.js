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

    const create = (event) => {
        event.preventDefault()
        const form = new FormData(event.target)
        const values = Object.keys(config.entities[entityName].fields).reduce((values, field) => {
            const value = form.get(field)
            values[field] = value
            return values
        }, {})

        console.log(values);

        push(ref(db, `${entityName}`), values)
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

        get(child(dbRef, `${entityName}`)).then((snapshot) => {
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

    useEffect(() => {
        get(child(dbRef,`${entityName}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setTableValue(snapshot.val())
                console.log(tableValue);
                // console.log(snapshot.val());
                // console.log(  Object.values(snapshot.val())  )
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    },[entityName]);

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
        <CRUDContext.Provider
            value={{
                create,
                updateData,
                deleteData,
                showData,
                tableValue,
                
            }}
        >
            {children}
        </CRUDContext.Provider>
    );
}
export default CrudProvider;


export const useCRUD = () => useContext(CRUDContext);