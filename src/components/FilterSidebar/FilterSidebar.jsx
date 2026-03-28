import React from 'react';
import { useProductValue } from '../../context/ProductContext';
import './FilterSidebar.css';

const FilterSidebar = () => {
    const { priceRange, setPriceRange, categories, setCategories } = useProductValue();

    const handleCategoryChange = (category) => {
        setCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    return (
        <aside className="filter-sidebar">
            <h3>Filter</h3>
            <div className="filter-section">
                <p>Price: {priceRange}</p>
                <input
                    type="range"
                    min="1"
                    max="100000"
                    step="10"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                />
            </div>
            <div className="filter-section">
                <h3>Category</h3>
                <div className="category-list">
                    {Object.keys(categories).map(cat => (
                        <div key={cat} className="category-item">
                            <input
                                type="checkbox"
                                id={cat}
                                checked={categories[cat]}
                                onChange={() => handleCategoryChange(cat)}
                            />
                            <label htmlFor={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</label>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default FilterSidebar;
