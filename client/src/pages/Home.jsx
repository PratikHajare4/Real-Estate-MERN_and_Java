import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'
import './Home.css';
import Footer from '../components/Footer';
function Home() {
  const [propertyType, setPropertyType] = useState('residential'); // Toggle between 'residential' and 'commercial'
  const [unitType, setUnitType] = useState('');
  const [city, setCity] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add API call or other logic here
  };

  return (
    <div className="search-container">
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
      <Footer></Footer>
    </div>
  );
}

export default Home;