import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import CartPage from './pages/CartPage/CartPage';
import OrdersPage from './pages/OrdersPage/OrdersPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { AuthProvider, useAuthValue } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthValue();
  if (loading) return null;
  return user ? children : <Navigate to="/signin" />;
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "signin", element: <SignInPage /> },
        { path: "signup", element: <SignUpPage /> },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          )
        },
        {
          path: "myorders",
          element: (
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          )
        },
        { path: "*", element: <NotFoundPage /> }
      ]
    }
  ]);

  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <RouterProvider router={router} />
          <ToastContainer autoClose={2000} />
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
