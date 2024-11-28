const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({

  bookTitle: { 
    type: String, 
    required: true 
    },

  author: { 
    type: String 
    },

  reviewText: { 
    type: String, 
    required: true 
    },

  rating: { 
    type: Number, 
    min: 1, 
    max: 5, 
    required: true 
    },
    
  createdAt: { 
    type: Date, 
    default: Date.now 
    },
});


module.exports = mongoose.model('Review', reviewSchema);