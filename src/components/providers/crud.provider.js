import React, { createContext, useState, useEffect, useContext } from 'react';
import { getDatabase, get, ref, push, child, update, remove } from 'firebase/database';
import { db } from "../../services/firebase"
import { useParams } from "react-router";

const dbRef = ref(getDatabase());
const CRUDContext = createContext(null);

const CrudProvider = ({ children }) => {

    const { entityName } = useParams();
    const [tableValue, setTableValue] = useState([])
    const [change, setChange] = useState(0);

    const create = (values) => {
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
        // const keyPhaseValue = keyPhase(id)
        keyPhase(id)
        // console.log("chera", keyPhase(id));
        // // update(ref(db, `${entityName}` + '/' + `${idEntityName}`), values)
        // const val = {
        //     id: ""
        // }
        // update(ref(db, 'phase' + '/' + `${keyPhaseValue}` + `${entityName}` + '/'), val)
        // setChange(change + 1)

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
    //    qq: {
    //         pp:af
    //         oo:aa
    //     }
    const keyPhase = async (id) => {
        try {
            // console.log(id);
            const idEntityName = Object.keys(tableValue)[id]
            const data = await get(child(dbRef, 'phase'))
            if (data.exists()) {
                // console.log(data.val());
                for (const [key, value] of Object.entries(data.val())) {
                    // console.log("learningKey",idEntityName);
                    // console.log("keyPhaseSS",key);
                    // console.log(Object.values(value[entityName]));
                    const m = Object.values(value[entityName])
                    // console.log("mm", m);
                    // console.log("mm2",idEntityName);
                    m.map((l) => {
                        if (l == idEntityName) {
                            console.log("doros shod?");
                            console.log("khodaya adada", value[entityName]);
                            console.log("khodaya adada", Object.values(value[entityName]));
                            console.log("khodaya adada", Object.keys(value[entityName]));
                            console.log("peida shod?",);
                            const zahara = Object.values(value[entityName])
                            // const indexes =Object.values(value[entityName])
                            zahara.map((zahra, index) => {
                                if (zahra == l) {
                                    console.log(index);
                                    let val = {
                                        // [key]: ""
                                        [index]: '---------'
                                    }
                                    const path = 'phase' + '/' + `${key}` + '/' + `${entityName}`
                                    update(ref(db, path), val)

                                }

                            })



                        }
                    })
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        get(child(dbRef, `${entityName}`)).then((data) => {
            if (data.exists()) {
                setChange(change + 1)
                setTableValue(data.val())
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

    }, [entityName, change]);

    const learningData = async (refrence) => {
        try {
            const data = await get(child(dbRef, `${refrence}`))
            if (data.exists()) {
                return data.val()
            } else {
                console.log("No data available");
            }
            return data.val()
        } catch (error) {
            console.error("The Promise is rejected!", error);
        }
    }


    return (
        <CRUDContext.Provider
            value={{
                create,
                edit,
                deleteData,
                tableValue,
                learningData,
            }}
        >
            {children}
        </CRUDContext.Provider>
    );
}

export default CrudProvider;
export const useCRUD = () => useContext(CRUDContext);