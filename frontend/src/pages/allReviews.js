import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/allReviews.css';

const ViewReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [editedReviewData, setEditedReviewData] = useState({
    bookTitle: '',
    author: '',
    reviewText: '',
    rating: 0,
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/reviews');
      setReviews(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setLoading(false);
    }
  };

  const handleEditClick = (review) => {
    setEditingReview(review._id);
    setEditedReviewData({
      bookTitle: review.bookTitle,
      author: review.author,
      reviewText: review.reviewText,
      rating: review.rating,
    });
  };

  const handleDeleteClick = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:8070/api/reviews/${reviewId}`);
      setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
      console.log('Review deleted successfully');
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedReviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:8070/api/reviews/${editingReview}`, editedReviewData);
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === editingReview ? { ...review, ...editedReviewData } : review
        )
      );
      setEditingReview(null);
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <span key={`full-${index}`} className="star full-star">★</span>
        ))}
        {halfStar && <span className="star half-star">★</span>}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={`empty-${index}`} className="star empty-star">★</span>
        ))}
      </>
    );
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="reviews-container">
      <h2 className="reviews-title">All Book Reviews</h2>
      {reviews.length > 0 ? (
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review._id} className="review-card">
              <h3 className="review-bookTitle">{review.bookTitle}</h3>
              <p className="review-author"><strong>Author:</strong> {review.author}</p>
              <p className="review-text"><strong>Review:</strong> {review.reviewText}</p>
              <div className="review-rating">
                <strong>Rating:</strong> {renderStars(review.rating)}
              </div>
              <button
                  className="edit-button"
                  onClick={() => handleEditClick(review)}
                >
                  <i className="fas fa-edit"></i>
                </button>
              <button className="delete-button" onClick={() => handleDeleteClick(review._id)}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews available.</p>
      )}

      {editingReview && (
        <div className="edit-form-container">
          <h2>Edit Review</h2>
          <form>
            <div className="form-group">
              <label>Book Title:</label>
              <input
                type="text"
                name="bookTitle"
                value={editedReviewData.bookTitle}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Author:</label>
              <input
                type="text"
                name="author"
                value={editedReviewData.author}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Review:</label>
              <textarea
                name="reviewText"
                value={editedReviewData.reviewText}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Rating:</label>
              <input
                type="number"
                name="rating"
                value={editedReviewData.rating}
                onChange={handleInputChange}
                min="0"
                max="5"
              />
            </div>
            <button type="button" onClick={handleSaveEdit}>Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ViewReviews;
