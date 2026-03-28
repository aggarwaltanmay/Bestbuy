import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useCartValue } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { user } = useAuthValue();
    const { addToCart, updateQuantity, removeFromCart } = useCartValue();
    const navigate = useNavigate();
    const location = useLocation();

    const isCartPage = location.pathname === "/cart";

    const handleAddToCart = async () => {
        if (!user) {
            navigate("/signin");
            return;
        }
        await addToCart(product);
    };

    return (
        <div className="product-card">
            <div className="product-image">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
                <h3>{product.name}</h3>
                <p>₹ {product.price}</p>
                {isCartPage ? (
                    <div className="cart-actions">
                        <div className="quantity-controls">
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/1828/1828925.png"
                                alt="decrease"
                                onClick={() => updateQuantity(product.id, -1)}
                            />
                            <span>{product.quantity}</span>
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/1828/1828926.png"
                                alt="increase"
                                onClick={() => updateQuantity(product.id, 1)}
                            />
                        </div>
                        <button className="remove-btn" title="Remove from Cart" onClick={() => removeFromCart(product.id)}>
                            Remove From Cart
                        </button>
                    </div>
                ) : (
                    <button className="add-btn" title="Add to Cart" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
