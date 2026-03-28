import React from 'react';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useProductValue } from '../../context/ProductContext';
import { PulseLoader } from 'react-spinners';
import './HomePage.css';

const HomePage = () => {
    const { products, loading, searchQuery, setSearchQuery } = useProductValue();

    if (loading) {
        return (
            <div className="loader-container">
                <PulseLoader color="#7064e5" />
            </div>
        );
    }

    return (
        <div className="home-container">
            <div className="search-bar-container">
                {/* Added onSubmit to prevent page reload */}
                <form className="search-form" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="search"
                        placeholder="Search By Name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>
            </div>
            
            <div className="home-content">
                <FilterSidebar />
                <div className="product-grid">
                    {products.length > 0 ? (
                        products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <h2 className="no-results">No products found.</h2>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;


