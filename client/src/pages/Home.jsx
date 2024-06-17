import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';
import partner1 from '../assets/partner1.png';
import partner2 from '../assets/partner2.png';
import partner3 from '../assets/partner3.png';
import partner4 from '../assets/partner4.png';
import partner5 from '../assets/partner5.png';
import partner6 from '../assets/partner6.png';
import partner7 from '../assets/partner7.png';
// Add more imports for partner logos as needed

import city1 from '../assets/city1.jpg';
import city5 from '../assets/city5.jpg';
import city3 from '../assets/city3.jpg';
import city4 from '../assets/city4.jpg';

import homeBackground from '../assets/home.jpg'; // import the background image


function Home() {
  const [propertyType, setPropertyType] = useState('residential'); // Toggle between 'residential' and 'commercial'
  const [unitType, setUnitType] = useState('');
  const [city, setCity] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add API call or other logic here
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    
  };

  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    
  };

  const testimonials = [
    {
      quote: "This service is fantastic! We found our dream home in no time.",
      name: "John Doe",
      position: "Homeowner"
    },
    {
      quote: "A seamless experience from start to finish. Highly recommend!",
      name: "Jane Smith",
      position: "Investor"
    },
    {
      quote: "The best real estate service we've ever used.",
      name: "Sam Wilson",
      position: "Renter"
    }
  ];

  const partners = [
    { image: partner1, name: "Partner 1" },
    { image: partner2, name: "Partner 2" },
    { image: partner3, name: "Partner 3" },
    { image: partner4, name: "Partner 4" },
    { image: partner5, name: "Partner 5" },
    { image: partner6, name: "Partner 6" },
    { image: partner7, name: "Partner 7" }
  ];

  return (
    <div className="search-container">
     <div className="background-image"></div>
      <h1 style={{ fontSize: '20px', color: '#ffb703' }}>It's Great to be home!</h1>
      <h1 style={{ fontSize: '70px', color: '#ffb703' }}>Find Your Perfect Home</h1>
      <div className="tabs">
        <button onClick={() => setPropertyType('residential')} className={propertyType === 'residential' ? 'active' : ''}>Residential</button>
        <button onClick={() => setPropertyType('commercial')} className={propertyType === 'commercial' ? 'active' : ''}>Commercial</button>
      </div>
      <form onSubmit={handleSubmit}>
        <select className='ram' value={unitType} onChange={e => setUnitType(e.target.value)}>
          <option value="">Select Unit Type</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
        </select>
        <input type="text" className="search-city-input" placeholder="Search city" value={city} onChange={e => setCity(e.target.value)} />
        <select  className='ram'  value={budget} onChange={e => setBudget(e.target.value)}>
          <option value="">Select Budget</option>
          <option value="250000">$250,000</option>
          <option value="500000">$500,000</option>
        </select>
        <button type="submit" className="search-button"><FaSearch style={{ marginRight: '8px', fontSize: '16px' }} />SEARCH</button>
      </form>
      <div className="footer">
        <span>Presence<br/> Asia Pacific-India & UAE</span>
        <span>100+ <br/>Developers</span>
        <span>500+ <br/>Projects</span>
        <span>5000+ <br/>Customers</span>
      </div>

    
      {/* Our Partners Slider */}
      <div className="our-partners">
        <h2 className="partners-heading text-2xl font-bold mb-4">Our Partners</h2>
        <Slider {...sliderSettings} className="partner-slider">
          <div className="slide"><img src={partner1} alt="Partner 1" /></div>
          <div className="slide"><img src={partner2} alt="Partner 2" /></div>
          <div className="slide"><img src={partner3} alt="Partner 3" /></div>
          <div className="slide"><img src={partner4} alt="Partner 4" /></div>
          <div className="slide"><img src={partner5} alt="Partner 5" /></div>
          <div className="slide"><img src={partner6} alt="Partner 6" /></div>
          <div className="slide"><img src={partner7} alt="Partner 7" /></div>
        </Slider>
      </div>

      {/* Featured Cities Section */}
      <div className="featured-cities">
        <h2 className="cities-heading text-2xl font-bold mb-4">Featured Cities</h2>
        <div className="city-slider">
          <Slider {...sliderSettings}>
            <div className="slide"><img src={city1} alt="City 1" /></div>
            <div className="slide"><img src={city5} alt="City 5" /></div>
            <div className="slide"><img src={city3} alt="City 3" /></div>
            <div className="slide"><img src={city4} alt="City 4" /></div>
            {/* Add more slides as needed */}
          </Slider>
        </div>
      </div>

       {/* Testimonial Slider */}
       <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
      <Slider {...testimonialSettings} className="testimonial-slider mb-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-slide">
            <blockquote>"{testimonial.quote}"</blockquote>
            <p>- {testimonial.name}, {testimonial.position}</p>
          </div>
        ))}
      </Slider>
      
    </div>
  );
}

export default Home;
