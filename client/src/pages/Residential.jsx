import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Residential() {
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleShowListings = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/user/listings');
      const data = await res.json();
      if (data.success === false) {
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

  return (
    <div>
      <div className="contact-banner">
        <h1 className="ram">Residential</h1>
      </div>

      <div className="p-5">
        {loading && <p>Loading listings...</p>}
        {error && <p>{error}</p>}
        {!loading && userListings && userListings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userListings.map((listing) => (
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
      </div>
    </div>
  );
}
