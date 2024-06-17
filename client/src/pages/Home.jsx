import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './Home.css';
import Footer from '../components/Footer';

function Home() {
  const [propertyType, setPropertyType] = useState('residential'); // Toggle between 'residential' and 'commercial'
  const [unitType, setUnitType] = useState('');
  const [city, setCity] = useState('');
  const [budget, setBudget] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchName, setSearchName] = useState('');
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleListings, setVisibleListings] = useState(6); // State to control number of visible listings

  const handleSubmit = (event) => {
    event.preventDefault();
    handleShowListings();
  };

  const handleShowListings = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/user/listings');
      const data = await res.json();
      if (!res.ok) {
        setError('Failed to fetch listings');
        setLoading(false);
        return;
      }
      setUserListings(data);
      setLoading(false);
    } catch (err) {
      setError('An error occurred while fetching listings');
      setLoading(false);
    }
  };

  useEffect(() => {
    handleShowListings();
  }, []);

  const handleShowMore = () => {
    setVisibleListings((prevVisibleListings) => prevVisibleListings + 6);
  };

  const filteredListings = userListings.filter((listing) => {
    const matchesLocation = searchLocation ? listing.address.toLowerCase().includes(searchLocation.toLowerCase()) : true;
    const matchesName = searchName ? listing.name.toLowerCase().includes(searchName.toLowerCase()) : true;
    return matchesLocation && matchesName;
  });

  return (
    <div className="search-container">
      <h1 style={{ fontSize: '20px', color: '#ffb703' }}>It's Great to be home!</h1>
      <h1 style={{ fontSize: '70px', color: '#ffb703' }}>Find Your Perfect Home</h1>
      <div className="tabs">
        <button onClick={() => setPropertyType('residential')} className={propertyType === 'residential' ? 'active' : ''}>Residential</button>
        <button onClick={() => setPropertyType('commercial')} className={propertyType === 'commercial' ? 'active' : ''}>Commercial</button>
      </div>
      <form onSubmit={handleSubmit}>
        {/* <select className='ram' value={unitType} onChange={e => setUnitType(e.target.value)}>
          <option value="">Select Unit Type</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
        </select> */}
        {/* <input type="text" className="search-city-input" placeholder="Search city" value={city} onChange={e => setCity(e.target.value)} /> */}
        <input type="text" className="search-city-input text-black " placeholder="Search location" value={searchLocation} onChange={e => setSearchLocation(e.target.value)} />
        <input type="text" className="search-city-input text-black" placeholder="Search name" value={searchName} onChange={e => setSearchName(e.target.value)} />
        {/* <select className='ram' value={budget} onChange={e => setBudget(e.target.value)}>
          <option value="">Select Budget</option>
          <option value="250000">$250,000</option>
          <option value="500000">$500,000</option> 
        </select> */}
        <button type="submit" className="search-button"><FaSearch style={{ marginRight: '8px', fontSize: '16px' }} />SEARCH</button>
      </form>
      
      <div className="p-5">
        {loading && <p>Loading listings...</p>}
        {error && <p>{error}</p>}
        {!loading && filteredListings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.slice(0, visibleListings).map((listing) => (
              <div key={listing._id} className="border rounded-lg p-3 shadow-lg bg-white">
                <Link to={`/listing/${listing._id}`} className="block mb-2">
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                    className="w-full h-48 object-cover rounded-md"
                  />
                </Link>
                <div className="flex justify-between items-center">
                  <Link className="text-slate-700 font-semibold hover:underline truncate" to={`/listing/${listing._id}`}>
                    <p>{listing.name}</p>
                  </Link>
                  <p className="text-green-500 font-bold">
                    ${listing.regularPrice}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && filteredListings.length === 0 && (
          <p>No listings found.</p>
        )}
        {/* {!loading && filteredListings.length > visibleListings && (
          <div className="flex justify-center mt-6">
            <button onClick={handleShowMore} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
              Show More
            </button>
          </div>
        )} */}
        {!loading && filteredListings.length > visibleListings && (
          <div className="flex justify-center mt-6">
            <Link to="/residential" className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
              View All Listings
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
