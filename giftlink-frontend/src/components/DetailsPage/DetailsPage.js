import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';
import './DetailsPage.css';

function DetailsPage() {
    // Task 1: Check for authentication
    const navigate = useNavigate();
    const { productId } = useParams();
    const [gift, setGift] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check authentication
        const token = sessionStorage.getItem('auth-token');
        if (!token) {
            navigate('/app/login');
            return;
        }

        // Task 3: Scroll to top
        window.scrollTo(0, 0);

        // Task 2: Fetch gift details
        const fetchGiftDetails = async () => {
            try {
                const response = await fetch(`${urlConfig.backendUrl}/api/gifts/${productId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setGift(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGiftDetails();
    }, [productId, navigate]);

    // Task 4: Handle back click
    const handleBackClick = () => {
        navigate(-1);
    };

    if (loading) return <div className="text-center my-5">Loading...</div>;
    if (error) return <div className="alert alert-danger">Error: {error}</div>;
    if (!gift) return <div className="alert alert-info">No gift found</div>;

    return (
        <div className="container mt-4">
            <button onClick={handleBackClick} className="btn btn-secondary mb-4">
                &larr; Back to Gifts
            </button>

            <div className="row">
                <div className="col-md-6">
                    {/* Task 5: Display gift image */}
                    <div className="image-container">
                        {gift.image ? (
                            <img 
                                src={gift.image} 
                                alt={gift.name} 
                                className="img-fluid rounded product-image-large"
                            />
                        ) : (
                            <div className="no-image-placeholder">
                                No Image Available
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="col-md-6">
                    {/* Task 6: Display gift details */}
                    <div className="product-details">
                        <h2>{gift.name}</h2>
                        <p className="text-muted">Category: {gift.category}</p>
                        <p className={`condition ${gift.condition.toLowerCase()}`}>
                            Condition: {gift.condition}
                        </p>
                        <p>Posted: {new Date(gift.date_added * 1000).toLocaleDateString()}</p>
                        <p>Age: {gift.age_years} years</p>
                        <div className="description">
                            <h4>Description</h4>
                            <p>{gift.description || 'No description provided'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Task 7: Render comments section */}
            <div className="comments-section mt-5">
                <h3>Comments</h3>
                {gift.comments && gift.comments.length > 0 ? (
                    <div className="comments-list">
                        {gift.comments.map((comment, index) => (
                            <div key={index} className="comment card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">{comment.user}</h5>
                                    <p className="card-text">{comment.text}</p>
                                    <small className="text-muted">
                                        {new Date(comment.timestamp * 1000).toLocaleString()}
                                    </small>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No comments yet. Be the first to comment!</p>
                )}
            </div>
        </div>
    );
}

export default DetailsPage;