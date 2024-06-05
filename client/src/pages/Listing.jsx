import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Listing() {
const [listing, setListing] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);
    const params = useParams();
    useEffect(()=> {
        const fetchListing = async () => {
            const res = await fetch(`http://localhost:3000/api/listing/get/${params.listingId}`);
            const data = await res.json();
            if (data.success === false) {
                return;
            }
            setListing(data);
            setLoading(false);
            setError(false);
        }
        fetchListing()
    }, [params.listingId])
  return (
    <main>
      { loading &&  <p className='text-center my-7 text-2xl ' >Loading...</p>}
      { error && <p className='text-center my-7 text-2xl'>Something went wrong!</p> }
      {listing && !loading && !error && (
        <>
         <Swiper navigation modules={[Navigation]}>
                        {listing.imageUrls.map((url, index) => (
                            <SwiperSlide key={index}>
                                <div className='h-[550px]' style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}></div>
                            </SwiperSlide>
                        ))}
          </Swiper>

      <div> 
      
          <p>{ listing.name} </p>
          <p>{listing.description}</p>
    
          <p>{listing.address}</p>
          <p>{listing.description}</p>
          <p>{listing.description}</p>
          <p>{listing.description}</p>
          <p>{listing.description}</p>
          <p>{listing.description}</p>
          <p>{listing.description}</p>
      </div>
      </>
      )
      }


    </main>
  )
}
