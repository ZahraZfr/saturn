import { Link } from 'react-router-dom'
import { auth } from '../services/firebase'
const Admin = () => {
    const logout = async () => {
        try {
            await auth.signOut(() => {
                console.log("sign out");
            });
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
    return (
        <div className="">
        {/* <div className="mb-10">
                <Link className="  bg-green-500 hover:bg-green-800 p-5 rounded-2xl" to="/register" >Register</Link>
            </div> */}

            <div>
                <button className="px-8 py-2 text-xl bg-red-500 hover:bg-red-600 rounded-2xl fixed top-20 right-5 text-white shadow-lg" onClick={logout}>Log out</button>
            </div>
        </div>
    )
}

export default Admin;