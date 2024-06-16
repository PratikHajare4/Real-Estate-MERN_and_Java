import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faSwimmer, faTree, faCar, faVideo, faGamepad, faHouse, faRunning, faTint, faRecycle, faElevator, faPlug, faShieldAlt, faFaucet, faUsers } from '@fortawesome/free-solid-svg-icons';
// Map amenities to FontAwesome icons
const amenitiesIcons = {
  gym: faDumbbell,
  pool: faSwimmer,
  park: faTree,
  garden: faTree,
  maintenanceStaff: faUsers,
  powerBackup: faPlug,
  elevator: faElevator,
  waterSupply: faFaucet,
  carParking: faCar,
  cctv: faVideo,
  indoorGames: faGamepad,
  clubHouse: faHouse,
  joggingTrack: faRunning,
  rainwaterHarvesting: faTint,
  sewageTreatment: faRecycle,
  swimmingPool: faSwimmer
};

import { IoLocationSharp } from "react-icons/io5";

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


    const renderAmenities = (amenities) => {
      return Object.keys(amenities)
          .filter(key => amenities[key])
          .map(key => (
              <li key={key} className='flex flex-row flex-wrap items-center mb-2 border rounded-lg  p-5'>
                <div className="flex flex-col">
                  <FontAwesomeIcon icon={amenitiesIcons[key]} className='mr-2 text-4xl' />
                  
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </div>
              </li>
          ));
  };

  return (
    <main className='bg-[#EEEEEE]'>
      { loading &&  <p className='text-center my-7 text-2xl ' >Loading...</p>}
      { error && <p className='text-center my-7 text-2xl'>Something went wrong!</p> }
      {listing && !loading && !error && (
        <>
     
         <Swiper navigation modules={[Navigation]}>
                        {listing.imageUrls.map((url, index) => (
                            <SwiperSlide key={index}>
                                <div className='h-[550px] rounded-3xl m-[50px] mt-5 border transition' style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}></div>
                            </SwiperSlide>
                        ))}
          </Swiper>

      <div className='ml-[50px] mr-[50px] bg-white rounded-2xl'> 
      <div className="m-5 p-5">
      <div className='flex justify-between items-center ml-1    '>
            <h1 className='text-[24px]  mt-5 text-black font-bold '>{ listing.name} </h1>
            <h1 className='text-[24px]  mt-5 text-black font-bold '>₹ { listing.regularPrice}  </h1>
            
      </div>
          <div className="flex flex-row items-center ">
          <IoLocationSharp />
          <p className='ml-3'>{listing.address}</p>
          </div>
          <div className='flex flex-row items-center gap-6 m-5'>
            <div className='border p-5 rounded-2xl bg-slate-500 text-white '>
              <p className=''>Apartments</p>
              <p>{listing.apartments}</p>
            </div>
            <div className='border p-5  rounded-2xl bg-slate-500 text-white  '>
              <p className=''>Total Area</p>
              <p>{listing.totalArea}</p>
            </div>
            <div className='border p-5  rounded-2xl bg-slate-500 text-white '>
              <p className=''>Carpet Range</p>
              <p>{listing.carpetRange}</p>
            </div>
          </div>
          
          

          </div>
      </div>

    <div className="ml-[50px] mr-[50px] bg-white rounded-2xl">
    
          <div className="m-5 p-5">
                  <p className='font-bold text-2xl text-center'>{listing.name} Overview</p>
              <div className=" flex flex-row gap-[100px] mt-10">
                      <div className="flex flex-col gap-5">
                           <div className="p-3 border rounded-2xl">
                              <p className='font-semibold text-slate-700 text-2xl'>Apartments</p>
                              <p className='text-slate-900 text-xl'>{listing.apartments}</p>
                           </div>
                           <div className="p-3 border rounded-2xl">
                                  <p className='font-semibold text-slate-700 text-2xl'>Total Area</p>
                                  <p className='text-slate-900 text-xl'>{listing.totalArea}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                              <div className="p-3 border rounded-2xl">
                                <p className='font-semibold text-slate-700 text-2xl'>PROJECT RERA ID </p>
                                <p className='text-slate-900 text-xl'>{listing.projectRERAID}</p>
                             </div>
                              <div className="p-3 border rounded-2xl">
                                   <p className='font-semibold text-slate-700 text-2xl'> Possession Date </p>
                                    <p className='text-slate-900 text-xl'>{listing.possessionDate}</p>
                              </div>
                        </div>
      
               </div>
           </div>
    </div>

      {/* new block */}

<div className="ml-[50px] mr-[50px] bg-white rounded-2xl">
  <div className="m-5 p-5">
    <p className='text-2xl font-bold '>About {listing.name}</p>
    <p className='text-slate-600'>{listing.description}</p>

  </div>
</div>

   {/* new block */}
   <div className="ml-[50px] mr-[50px] bg-white rounded-2xl">
  <div className="m-5 p-5">
    <p className='text-2xl font-bold'>{listing.name} Amenities</p>
    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-2'>
      {renderAmenities(listing.amenities)}
    </ul>
  </div>
</div>





      </>
      )
      }


    </main>
  )
}
