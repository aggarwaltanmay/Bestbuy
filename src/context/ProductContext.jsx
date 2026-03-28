import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    collection,
    onSnapshot,
    query,
    setDoc,
    doc,
    getDocs
} from 'firebase/firestore';
import { db } from '../firebaseInit';
import { data as initialData } from '../utils/data';

const ProductContext = createContext();

export const useProductValue = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    //const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [priceRange, setPriceRange] = useState(75000);
    const [categories, setCategories] = useState({
        men: false,
        women: false,
        electronics: false,
        jewlery: false
    });

    useEffect(() => {
        const initializeProducts = async () => {
            try {
                console.log("Initializing products...");
                const productsCol = collection(db, 'products');
                const productSnapshot = await getDocs(productsCol);

                if (productSnapshot.empty) {
                    console.log("Product collection empty, uploading initial data...");
                    // Upload initial data if collection is empty
                    for (const item of initialData) {
                        await setDoc(doc(productsCol, item.id.toString()), item);
                    }
                    console.log("Initial data uploaded successfully.");
                }

                const q = query(collection(db, 'products'));
                const unsubscribe = onSnapshot(q, (snapshot) => {
                    const productsData = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    console.log("Products fetched:", productsData.length);
                    setProducts(productsData);
                    setLoading(false);
                }, (error) => {
                    console.error("Error in onSnapshot:", error);
                    setLoading(false);
                });
                return () => unsubscribe();
            } catch (error) {
                console.error("Error initializing products:", error);
                setLoading(false);
            }
        };

        initializeProducts();
    }, []);

    const filteredProducts = products.filter(product => {
        const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchPrice = product.price <= priceRange;
        const activeCategories = Object.keys(categories).filter(cat => categories[cat]);
        const matchCategory = activeCategories.length === 0 || activeCategories.includes(product.category);

        return matchSearch && matchPrice && matchCategory;
    });

    return (
        <ProductContext.Provider value={{
            products: filteredProducts,
            
            searchQuery,
            setSearchQuery,
            priceRange,
            setPriceRange,
            categories,
            setCategories
        }}>
            {children}
        </ProductContext.Provider>
    );
};
