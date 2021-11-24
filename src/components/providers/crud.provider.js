import React, { createContext, useState, useEffect , useContext} from 'react';
import { getDatabase, get, ref, set, push, child, update, remove } from 'firebase/database';
import { db } from "../../services/firebase"
const dbRef = ref(getDatabase());

const CRUDContext = createContext(null);


const ContactForm = () => {
    // const [tableValue, setTableValue] = useState([])

    const create = () => {
     
		// console.log({values})
      
       
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

        <CRUDContext.Provider
            value={{
                create,
                updateData,
                deleteData,
                showData

            }}
        >
            {children}
        </CRUDContext.Provider>

    );
}
export default ContactForm;


export const useCRUD = () => useContext(ContactForm);