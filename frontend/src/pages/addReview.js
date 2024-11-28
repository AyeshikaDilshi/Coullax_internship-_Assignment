import React, { useState } from 'react';
import axios from 'axios';
import '../css/addReview.css';

const AddReview = ({ navigateBack }) => {
  const [newReview, setNewReview] = useState({
    bookTitle: '',
    author: '',
    reviewText: '',
    rating: 0,
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleStarClick = (rating) => {
    setNewReview((prevReview) => ({
      ...prevReview,
      rating: rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8070/api/reviews', newReview);
      setSuccessMessage('Review added successfully!');
      setErrorMessage('');
      setNewReview({
        bookTitle: '',
        author: '',
        reviewText: '',
        rating: 0,
      });

      // Optionally redirect back to the reviews page
      if (navigateBack) navigateBack();
    } catch (error) {
      console.error('Error adding review:', error);
      setErrorMessage('Failed to add review. Please try again.');
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`add-review-star ${i <= rating ? 'add-review-full' : 'add-review-empty'}`}
          onClick={() => handleStarClick(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="add-review-container">
      <h2>Add a New Book Review</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="add-review-form">
        <div className="form-group">
          <label>Book Title:</label>
          <input
            type="text"
            name="bookTitle"
            value={newReview.bookTitle}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={newReview.author}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Review:</label>
          <textarea
            name="reviewText"
            value={newReview.reviewText}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Rating:</label>
          <div className="star-rating">
            {renderStars(newReview.rating)}
          </div>
        </div>
        <button type="submit" className="submit-button">Add Review</button>
      </form>
    </div>
  );
};

export default AddReview;
