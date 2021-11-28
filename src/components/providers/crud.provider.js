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
    // const [change1, setChange1] = useState(true);
    const [change, setChange] = useState(true);
    const [change1, setChange1] = useState(true);

    const create = (event) => {
        event.preventDefault()
        console.log("what");
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
            // setChange1(!change1)
        console.log("hi");
        setChange(!change1)
    }

    const edit = ((id) => {
        return (event) => {
            event.preventDefault()
            const form = new FormData(event.target)
            const values = Object.keys(config.entities[entityName].fields).reduce((values, field) => {
                const value = form.get(field)
                values[field] = value
                return values
            }, {})
            // console.log("iddd",id);
            console.log(values);
            console.log(Object.keys(tableValue)[id]);
            const idEntityName = Object.keys(tableValue)[id]
            update(ref(db, `${entityName}` + '/' + `${idEntityName}`), values)
                .then(() => {
                    alert("data successful update")
                })
                .catch((error) => {
                    alert("unsuccessful" + error)
                })
        }
   
    })
    // const edit = (event) => {
    //     event.preventDefault()
    //     const form = new FormData(event.target)
    //     const values = Object.keys(config.entities[entityName].fields).reduce((values, field) => {
    //         const value = form.get(field)
    //         values[field] = value
    //         return values
    //     }, {})
    //     // console.log("iddd",id);
    //     console.log(values);
    //     console.log(Object.keys(tableValue)[0]);
    //     const idEntityName = Object.keys(tableValue)[0]
    //     update(ref(db, `${entityName}` + '/' + `${idEntityName}`), values)
    //         .then(() => {
    //             alert("data successful update")
    //         })
    //         .catch((error) => {
    //             alert("unsuccessful" + error)
    //         })
    // }



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
        get(child(dbRef, `${entityName}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setTableValue(snapshot.val())
                // console.log(tableValue);
                // console.log(snapshot.val());
                // console.log(  Object.values(snapshot.val())  )
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [entityName, change,change1]);

    const deleteData = (id) => {
        const idEntityName = Object.keys(tableValue)[id]
        remove(ref(db, `${entityName}` + '/' + `${idEntityName}`))
            .then(() => {
                alert("data successful remove")
            })
            .catch(() => {
                alert("unseccesful")
            })
        setChange(!change)
    }

    return (
        <CRUDContext.Provider
            value={{
                create,
                edit,
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