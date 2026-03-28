import React from 'react';
import { useCartValue } from '../../context/CartContext';
import { PulseLoader } from 'react-spinners';
import './OrdersPage.css';

const OrdersPage = () => {
    const { orders, loading } = useCartValue();

    if (loading) {
        return (
            <div className="loader-container">
                <PulseLoader color="#7064e5" />
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="no-orders">
                <h1>No orders Found</h1>
            </div>
        );
    }

    return (
        <div className="orders-page">
            <h1>Your Orders</h1>
            {orders.map(order => (
                <div key={order.id} className="order-item">
                    <h2>Ordered On:- {order.date}</h2>
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>₹ {item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>₹ {item.price * item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3">Total</td>
                                <td>₹ {order.total}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default OrdersPage;
