import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, setPersistence, browserSessionPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [pending, setPending] = useState(true)

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			setUser(user);
			setPending(false)
			console.log({ user });
		});
	});

	const SignIn = async ({ email, password }, callback) => {
		setPersistence(auth, browserSessionPersistence)
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

	if (pending) {
		return <>loading ...
		</>
	}

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
