import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			setUser(user);
			console.log({ user });
		});
	});

	const SignIn = async (email, password, callback) => {
		await signInWithEmailAndPassword(auth, email, password);
		callback();
	};

	const SignUp = async ({ email, password }, callback) => {
		await createUserWithEmailAndPassword(auth, email, password);
		callback();
	};

	const SignOut = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{
				User: user,
				SignIn,
				SignUp,
				SignOut
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
