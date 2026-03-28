import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    doc,
    onSnapshot,
    updateDoc,
    arrayUnion,
    arrayRemove,
    getDoc,
    setDoc,
    increment,
    collection,
    addDoc
} from 'firebase/firestore';
import { db } from '../firebaseInit';
import { useAuthValue } from './AuthContext';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCartValue = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user } = useAuthValue();
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setCart([]);
            setOrders([]);
            setLoading(false);
            return;
        }

        const cartRef = doc(db, 'users', user.uid);
        const unsubscribeCart = onSnapshot(cartRef, (docSnap) => {
            if (docSnap.exists()) {
                setCart(docSnap.data().cart || []);
            } else {
                setDoc(cartRef, { cart: [], orders: [] });
            }
            setLoading(false);
        });

        const ordersRef = collection(db, 'users', user.uid, 'orders');
        const unsubscribeOrders = onSnapshot(ordersRef, (snapshot) => {
            const ordersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setOrders(ordersData);
        });

        return () => {
            unsubscribeCart();
            unsubscribeOrders();
        };
    }, [user]);

    const addToCart = async (product) => {
        if (!user) {
            return false; // To handle redirect in component
        }

        const cartRef = doc(db, 'users', user.uid);
        const cartSnap = await getDoc(cartRef);
        const currentCart = cartSnap.data()?.cart || [];

        const existingItemIndex = currentCart.findIndex(item => item.id === product.id);

        if (existingItemIndex > -1) {
            currentCart[existingItemIndex].quantity += 1;
        } else {
            currentCart.push({ ...product, quantity: 1 });
        }

        await updateDoc(cartRef, { cart: currentCart });
        toast.success("Product added successfully!");
        return true;
    };

    const removeFromCart = async (productId) => {
        const cartRef = doc(db, 'users', user.uid);
        const cartSnap = await getDoc(cartRef);
        const currentCart = cartSnap.data()?.cart || [];

        const updatedCart = currentCart.filter(item => item.id !== productId);
        await updateDoc(cartRef, { cart: updatedCart });
        toast.success("Product removed successfully!");
    };

    const updateQuantity = async (productId, change) => {
        const cartRef = doc(db, 'users', user.uid);
        const cartSnap = await getDoc(cartRef);
        const currentCart = cartSnap.data()?.cart || [];

        const itemIndex = currentCart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            currentCart[itemIndex].quantity += change;
            if (currentCart[itemIndex].quantity <= 0) {
                currentCart.splice(itemIndex, 1);
            }
            await updateDoc(cartRef, { cart: currentCart });
        }
    };

    const purchase = async () => {
        if (cart.length === 0) return;

        const cartRef = doc(db, 'users', user.uid);
        const ordersRef = collection(db, 'users', user.uid, 'orders');

        const order = {
            date: new Date().toLocaleDateString(),
            items: cart,
            total: cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)
        };

        await addDoc(ordersRef, order);
        await updateDoc(cartRef, { cart: [] });
        toast.success("Order Placed successfully!");
    };

    const totalPrice = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

    return (
        <CartContext.Provider value={{
            cart,
            orders,
            addToCart,
            removeFromCart,
            updateQuantity,
            purchase,
            totalPrice,
            loading
        }}>
            {children}
        </CartContext.Provider>
    );
};
