import React, { createContext, useState, useEffect, useContext } from 'react';
import { getDatabase, get, ref, push, child, update, remove } from 'firebase/database';
import { db } from "../../services/firebase"
import { useParams } from "react-router";

const dbRef = ref(getDatabase());
const CRUDContext = createContext(null);

const CrudProvider = ({ children }) => {

    const { entityName } = useParams();
    const { actionName } = useParams();
    const [tableValue, setTableValue] = useState([])
    const [change, setChange] = useState(0);
    const [allPhaseData, setAllPhaseData] = useState();
    const [allRoadmapData, setAllRoadmapData] = useState();

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
        keyPhase(id)
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
    const keyPhase = async (id) => {
        try {
            const idEntityName = Object.keys(tableValue)[id]
            const data = await get(child(dbRef, 'phase'))
            if (data.exists()) {
                for (const [key, value] of Object.entries(data.val())) {
                    const m = Object.values(value[entityName])
                    m.map((l) => {
                        if (l == idEntityName) {
                            const zahara = Object.values(value[entityName])
                            zahara.map((zahra, index) => {
                                if (zahra == l) {
                                    let val = {
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

    //data of every entity
    useEffect(() => {
        get(child(dbRef, `${entityName}`)).then((data) => {
            if (data.exists()) {
                setChange(change + 1)
                setTableValue(data.val())
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [entityName, change]);


    //data koli used for phase 
    useEffect(() => {
        get(child(dbRef, `/`)).then((data) => {
            if (data.exists()) {
                const db = data.val()
                const phases = Object.keys(db.phase).map((key) => {
                    const phase = db.phase[key]
                    const learning = phase.learning.map((learningId) => {
                        return db.learning[learningId]
                    })
                    const project = phase.project.map((projectid) => {
                        return db.project[projectid]
                    })
                    return {
                        ...phase,
                        learning,
                        project,
                    }
                })
                setAllPhaseData(phases)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [entityName,change]);

    //data koli used for roadmap
    useEffect(() => {
        get(child(dbRef, `/`)).then((data) => {
            if (data.exists()) {
                setChange(change + 1)
                const db = data.val()
                const roadmaps = Object.keys(db.roadmap).map((key) => {
                    const roadmap = db.roadmap[key]
                    const phase = roadmap.phase.map((phaseid) => {
                        return db.phase[phaseid]
                    })
                    return {
                        ...roadmap,
                        phase,
                    }
                })
                setAllRoadmapData(roadmaps)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [entityName,change]);


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
                allPhaseData,
                allRoadmapData,
                
            }}
        >
            {children}
        </CRUDContext.Provider>
    );
}

export default CrudProvider;
export const useCRUD = () => useContext(CRUDContext);