import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartValue } from '../../context/CartContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import { PulseLoader } from 'react-spinners';
import './CartPage.css';

const CartPage = () => {
    const { cart, totalPrice, loading, purchase } = useCartValue();
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="loader-container">
                <PulseLoader color="#7064e5" />
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="empty-cart">
                <h1>Cart is Empty!</h1>
                <button onClick={() => navigate("/")}>Shop Now</button>
            </div>
        );
    }

    const handlePurchase = async () => {
        await purchase();
        navigate("/myorders");
    };

    return (
        <div className="cart-page">
            <aside className="cart-summary">
                <h3>Cart Summary</h3>
                <p>Total Price: ₹ {totalPrice}/-</p>
                <button title="Purchase" onClick={handlePurchase}>Purchase</button>
            </aside>
            <div className="cart-items-grid">
                {cart.map(item => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
        </div>
    );
};

export default CartPage;
