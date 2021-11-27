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
        <div className="mt-20">


            <div className="mb-10">
                <Link className="  bg-gray-300 p-5 rounded-full" to="/register">Register</Link>
            </div>

            <div>
                <button className="mb-10 p-6 text-3xl bg-red-400" onClick={logout}>Log out</button>
            </div>


            <div className="sidebar">
                <ul>
                    <li className="ext-2xl bg-yellow-300 rounded-full p-3">
                        <Link to='/admin/project/create' >
                            new project
                        </Link>
                    </li>
                </ul>
            </div>


            <div className="content">
                محتوای کلی
            </div>



        </div>
    )
}

export default Admin;