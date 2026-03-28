import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuthValue();

    return (
        <>
            <nav className="navbar">
                <div className="nav-logo">
                    <NavLink title="Home" to="/">BusyBuy</NavLink>
                </div>
                <div className="nav-links">
                    <NavLink title="Home" to="/">
                        <span>
                            <img className="nav-icon" src="https://cdn-icons-png.flaticon.com/128/1946/1946436.png" alt="home" />
                            Home
                        </span>
                    </NavLink>
                    {user ? (
                        <>
                            <NavLink title="My Orders" to="/myorders">
                                <span>
                                    <img className="nav-icon" src="https://cdn-icons-png.flaticon.com/128/891/891462.png" alt="orders" />
                                    My Orders
                                </span>
                            </NavLink>
                            <NavLink title="Cart" to="/cart">
                                <span>
                                    <img className="nav-icon" src="https://cdn-icons-png.flaticon.com/128/1170/1170678.png" alt="cart" />
                                    Cart
                                </span>
                            </NavLink>
                            <div className="logout-btn" onClick={logout}>
                                <span>
                                    <img className="nav-icon" src="https://cdn-icons-png.flaticon.com/128/1828/1828445.png" alt="logout" />
                                    Logout
                                </span>
                            </div>
                        </>
                    ) : (
                        <NavLink title="SignIn" to="/signin">
                            <span>
                                <img className="nav-icon" src="https://cdn-icons-png.flaticon.com/128/10405/10405526.png" alt="signin" />
                                SignIn
                            </span>
                        </NavLink>
                    )}
                </div>
            </nav>
            <Outlet />
        </>
    );
};

export default Navbar;
