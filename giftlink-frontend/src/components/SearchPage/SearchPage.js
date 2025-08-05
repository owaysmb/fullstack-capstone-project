import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { urlConfig } from '../../config';
import './SearchPage.css';

function SearchPage() {
    // Task 1: State variables
    const [searchQuery, setSearchQuery] = useState('');
    const [ageRange, setAgeRange] = useState(6);
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const categories = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
    const conditions = ['New', 'Like New', 'Older'];

    // Task 2: Fetch search results
    const handleSearch = async () => {
        const baseUrl = `${urlConfig.backendUrl}/api/search?`;
        const queryParams = new URLSearchParams({
            name: searchQuery,
            age_years: ageRange,
            category: document.getElementById('categorySelect').value,
            condition: document.getElementById('conditionSelect').value,
        }).toString();

        try {
            const response = await fetch(`${baseUrl}${queryParams}`);
            if (!response.ok) throw new Error('Search failed');
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        }
    };

    // Task 6: Navigation to details
    const goToDetailsPage = (productId) => {
        navigate(`/app/product/${productId}`);
    };

    // Initial load with all products
    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card search-card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Find Gifts</h2>
                            
                            {/* Task 7: Search input */}
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search gifts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="row filters-row">
                                <div className="col-md-4">
                                    {/* Task 3: Category dropdown */}
                                    <div className="form-group">
                                        <label htmlFor="categorySelect">Category</label>
                                        <select id="categorySelect" className="form-control">
                                            <option value="">All Categories</option>
                                            {categories.map(category => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    {/* Task 3: Condition dropdown */}
                                    <div className="form-group">
                                        <label htmlFor="conditionSelect">Condition</label>
                                        <select id="conditionSelect" className="form-control">
                                            <option value="">All Conditions</option>
                                            {conditions.map(condition => (
                                                <option key={condition} value={condition}>{condition}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    {/* Task 4: Age range slider */}
                                    <div className="form-group">
                                        <label htmlFor="ageRange">Max Age: {ageRange} years</label>
                                        <input
                                            type="range"
                                            className="form-control-range"
                                            id="ageRange"
                                            min="1"
                                            max="10"
                                            value={ageRange}
                                            onChange={(e) => setAgeRange(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Task 8: Search button */}
                            <button 
                                onClick={handleSearch} 
                                className="btn btn-primary btn-block mt-3 search-button"
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Task 5: Display results */}
                    <div className="search-results mt-4">
                        {searchResults.length > 0 ? (
                            <div className="row">
                                {searchResults.map(product => (
                                    <div key={product.id} className="col-md-6 mb-4">
                                        <div className="card h-100 product-card">
                                            {product.image ? (
                                                <img 
                                                    src={product.image} 
                                                    alt={product.name} 
                                                    className="card-img-top product-image"
                                                />
                                            ) : (
                                                <div className="image-placeholder">
                                                    No Image Available
                                                </div>
                                            )}
                                            <div className="card-body">
                                                <h5 className="card-title">{product.name}</h5>
                                                <p className="card-text text-muted">{product.category}</p>
                                                <p className="card-text">
                                                    {product.description?.slice(0, 100)}...
                                                </p>
                                            </div>
                                            <div className="card-footer">
                                                <button 
                                                    onClick={() => goToDetailsPage(product.id)}
                                                    className="btn btn-outline-primary"
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="alert alert-info text-center">
                                No gifts found. Try adjusting your search criteria.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;