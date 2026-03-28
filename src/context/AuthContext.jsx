import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth';
import { auth } from '../firebaseInit';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuthValue = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const signup = async (name, email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            return userCredential.user;
        } catch (error) {
            toast.error("Please enter valid data!");
            throw error;
        }
    };

    const signin = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            toast.error("Please enter valid data!");
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            toast.success("Signed out successfully!");
        } catch (error) {
            toast.error("Error signing out");
        }
    };

    return (
        <AuthContext.Provider value={{ user, signup, signin, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
