import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import '../css/home.css';


const images = [
  'https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/415078/pexels-photo-415078.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/1809340/pexels-photo-1809340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
];

function Home() {
  const settings = {
    dots: true, 
    infinite: true,
    speed: 500, 
    slidesToShow: 1, 
    slidesToScroll: 1, 
    autoplay: true,
    autoplaySpeed: 3000, 
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to the Book Review Application</h1>
        <p>Discover new books and share your thoughts with others!</p>
      </header>

      
      <section className="carousel-section">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Book ${index + 1}`} className="carousel-image" />
            </div>
          ))}
        </Slider>
      </section>

      <section className="home-actions">
        <Link to="/add" className="home-btn">Add a Book Review</Link>
        <Link to="/reviews" className="home-btn">View Reviews</Link>
      </section>
    </div>
  );
}

export default Home;
