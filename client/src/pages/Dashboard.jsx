import React from 'react'
import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

export default function Dashboard() {
      const [showListingsError, setShowListingError] = useState(false);
      const [userListings, setUserListings] = useState([]);

    // const [listings, setListings] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
  
    // useEffect(() => {
    //   // Fetch all listings from the backend
    //   const fetchListings = async () => {
    //     try {
    //       const response = await fetch('http://localhost:3000/api/user/listings'); // Adjust the URL if necessary
    //       const data = await response.json();
    //       if (response.ok) {
    //         setListings(data);
    //       } else {
    //         setError(data.message || 'Failed to fetch listings');
    //       }
    //     } catch (error) {
    //       setError(error.message || 'An error occurred');
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
  
    //   fetchListings();
    // }, []); // Empty array ensures this effect runs once when the component mounts
  
    // if (loading) {
    //   return <p>Loading...</p>;
    // }
  
    // if (error) {
    //   return <p>Error: {error}</p>;
    // }

    const handleShowListings = async () => {
        try{
            setShowListingError(false);
            const res = await fetch('http://localhost:3000/api/user/listings');
            const data = await res.json();
            if(data.success === false){
              setShowListingError(true);
              return
            }
            setUserListings(data);
        } catch(error){
            setShowListingError(true);
        }

    }

    const handleListingDelete = async (listingId) => {
        try {
          const res = await fetch(`http://localhost:3000/api/listing/delete/${listingId}`, {
            method : 'DELETE',

          });
          const data = await res.json();
          if (data.success === false) {
            console.log(data.message);
            return; 
          }
          setUserListings((prev) => 
            prev.filter((listing) => listing._id !== listingId))
        } catch(error) {
          console.log(error.message)
        }

    }
  return (
    <>
    <div className="flex m-5 justify-center items-center">
    <h1 className=' sm:text-2xl  text-gray-500'>Admin can add property listing from here</h1>
    </div>
    <Link to="/create-listing">
    <div className='mt-5 ml-10 flex justify-center items-center'>
      <button className='border rounded-2xl p-3 hover:bg-gray-800 hover:text-white  '>Add listing </button>
    </div>
    </Link>

    {/* <div>
      <h1>Listings</h1>
      <ul>
        {listings.map((listing) => (
          <li key={listing._id}>{listing.name}</li> // Display listing names, adjust as needed
        ))}
      </ul>
    </div> */}

<div className='flex flex-col items-center justify-center gap-4'>
<button onClick={handleShowListings} className='border p-3 text-rose-700 w-[150px] rounded-lg hover:bg-red-500 hover:text-white mt-2'>Show Listings</button>

<p className='text-red-900 mt-2'>{showListingsError ? "Error Showing Listing " : " "}</p>

{ userListings && userListings.length > 0 && 
<div>
  <h1 className='font-bold text-center text-3xl'>Your listing</h1>
  {
userListings.map((listing) => (
  <div key={listing._id} className="flex flex-row border rounded-lg p-3  justify-between items-center gap-4 ">
    <Link to={`/listings/${listing._id}`} >
      <img 
      src={listing.imageUrls[0]} 
      alt="listing cover" 
      className='w-18 h-16 object-contain ' />
    </Link>
    <Link className='text-slate-700  font-semibold 
      flex-1 hover:underline truncate' to={`/listings/${listing._id}`} >
      <p >{listing.name}</p>
    </Link>
    
    <div className='flex flex-col gap-2  '>
      <button onClick={() => handleListingDelete(listing._id)} className='border border-red-800  text-slate-700 rounded-lg p-2 hover:bg-red-700 hover:text-white '>Delete</button>
      <button className='border border-green-800  hover:bg-green-700 hover:text-white rounded-lg p-2 '>Edit</button>
    </div>
  </div>
))

}
</div>}
</div>

    </>
  )
}
  