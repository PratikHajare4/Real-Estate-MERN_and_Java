import React, { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 0,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
        apartments: '',
        totalArea: '',
        projectRERAID: '',
        possessionDate: '',
        carpetRange: '',
        amenities: {
            gym: false,
            pool: false,
            park: false,
            garden: false,
            maintenanceStaff: false,
            powerBackup: false,
            elevator: false,
            waterSupply: false,
            carParking: false,
            cctv: false,
            indoorGames: false,
            clubHouse: false,
            joggingTrack: false,
            rainwaterHarvesting: false,
            sewageTreatment: false,
            swimmingPool: false,
        }
    });
    
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true);
            setImageUploadError(false);
            const promises = [];
            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
                setImageUploadError(false);
                setUploading(false);
            }).catch((err) => {
                setImageUploadError('Image upload failed (2 mb max per image)');
                setUploading(false);
            });
        } else {
            setImageUploadError('You can only upload 6 images per listing');
            setUploading(false);
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    };

    const handleChange = (e) => {
        const { id, value, checked, type } = e.target;
        if (id === 'sale' || id === 'rent') {
            setFormData({
                ...formData,
                type: id
            });
        } else if (id === 'parking' || id === 'furnished' || id === 'offer' || id.startsWith('amenities.')) {
            if (id.startsWith('amenities.')) {
                const amenity = id.split('.')[1];
                setFormData({
                    ...formData,
                    amenities: {
                        ...formData.amenities,
                        [amenity]: checked
                    }
                });
            } else {
                setFormData({
                    ...formData,
                    [id]: checked,
                });
            }
        } else {
            setFormData({
                ...formData,
                [id]: value
            });
        }
    };
    
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.imageUrls.length < 1) {
                return setError("You must upload at least one image");
            }
            if (+formData.regularPrice < +formData.discountPrice) {
                return setError('Discount price must be lower than regular price');
            }
            setLoading(true);
            setError(false);
            const baseURL = 'http://localhost:3000';
            const res = await fetch(`${baseURL}/api/listing/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            setLoading(false);
            if (!res.ok || data.success === false) {
                setError(data.message || 'An error occurred');
            } else {
                navigate(`/listing/${data._id}`);
            }
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <main className='max-w-md px-2 mx-auto'>
            <h1 className='text-3xl text-center mt-6 font-bold'>Create a Listing</h1>
            <form onSubmit={handleSubmit}>
                
                <div className='flex flex-col'>
                <p className='text-lg mt-6 font-semibold'>Name</p>
                <input
                    type='text'
                    id='name'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Name'
                    required
                    className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
                />

                <p className='text-lg mt-6 font-semibold'>Description</p>
                <textarea
                    id='description'
                    value={formData.description}
                    onChange={handleChange}
                    placeholder='Description'
                    required
                    className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
                />

                <p className='text-lg mt-6 font-semibold'>Address</p>
                <input
                    type='text'
                    id='address'
                    value={formData.address}
                    onChange={handleChange}
                    placeholder='Address'
                    required
                    className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
                />

                <p className='text-lg mt-6 font-semibold'>Bedrooms</p>
                <input
                    type='number'
                    id='bedrooms'
                    value={formData.bedrooms}
                    onChange={handleChange}
                    min='1'
                    required
                    className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
                />

                <p className='text-lg mt-6 font-semibold'>Bathrooms</p>
                <input
                    type='number'
                    id='bathrooms'
                    value={formData.bathrooms}
                    onChange={handleChange}
                    min='1'
                    required
                    className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
                />

                <p className='text-lg mt-6 font-semibold'>Regular Price</p>
                <input
                    type='number'
                    id='regularPrice'
                    value={formData.regularPrice}
                    onChange={handleChange}
                    min='1'
                    required
                    className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
                />

                <p className='text-lg mt-6 font-semibold'>Discount Price</p>
                <input
                    type='number'
                    id='discountPrice'
                    value={formData.discountPrice}
                    onChange={handleChange}
                    min='0'
                    required
                    className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
                />

                <p className='text-lg mt-6 font-semibold'>Offer</p>
                <input
                    type='checkbox'
                    id='offer'
                    checked={formData.offer}
                    onChange={handleChange}
                    className='mr-2'
                />
                <label htmlFor='offer'>Check if there is a special offer</label>

                <p className='text-lg mt-6 font-semibold'>Parking</p>
                <input
                    type='checkbox'
                    id='parking'
                    checked={formData.parking}
                    onChange={handleChange}
                    className='mr-2'
                />
                <label htmlFor='parking'>Check if there is parking available</label>

                <p className='text-lg mt-6 font-semibold'>Furnished</p>
                <input
                    type='checkbox'
                    id='furnished'
                    checked={formData.furnished}
                    onChange={handleChange}
                    className='mr-2'
                />
                <label htmlFor='furnished'>Check if the property is furnished</label>

                <p className='text-lg mt-6 font-semibold'>Apartments</p>
                <input
                    type='text'
                    id='apartments'
                    value={formData.apartments}
                    onChange={handleChange}
                    placeholder='Number of Apartments'
                    className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
                />

                <p className='text-lg mt-6 font-semibold'>Total Area</p>
                <input
                    type='text'
                    id='totalArea'
                    value={formData.totalArea}
                    onChange={handleChange}
                    placeholder='Total Area'
                    className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
                />

                <p className='text-lg mt-6 font-semibold'>Project RERA ID</p>
                <input
                    type='text'
                    id='projectRERAID'
                    value={formData.projectRERAID}
                    onChange={handleChange}
                    placeholder='Project RERA ID'
                    className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
                />

                <p className='text-lg mt-6 font-semibold'>Possession Date</p>
                <input
                    type='date'
                    id='possessionDate'
                    value={formData.possessionDate}
                    onChange={handleChange}
                    className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
                />

                <p className='text-lg mt-6 font-semibold'>Carpet Range</p>
                <input
                    type='text'
                    id='carpetRange'
                    value={formData.carpetRange}
                    onChange={handleChange}
                    placeholder='Carpet Range'
                    className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
                />

<p className='text-lg mt-6 font-semibold'>Sell / Rent</p>
                <div className='flex'>
                    <button
                        type='button'
                        id='sale'
                        onClick={handleChange}
                        className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${formData.type === 'rent' ? 'bg-white text-black' : 'bg-slate-600 text-white'}`}
                    >
                        Sell
                    </button>
                    <button
                        type='button'
                        id='rent'
                        onClick={handleChange}
                        className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${formData.type === 'sale' ? 'bg-white text-black' : 'bg-slate-600 text-white'}`}
                    >
                        Rent
                    </button>
                </div>

               </div> 

                <p className='text-lg mt-6 font-semibold'>Amenities</p>
                <div className='flex flex-wrap'>
                    {Object.keys(formData.amenities).map((amenity) => (
                        <div key={amenity} className='mr-4'>
                            <label>
                                <input
                                    type='checkbox'
                                    id={`amenities.${amenity}`}
                                    checked={formData.amenities[amenity]}
                                    onChange={handleChange}
                                />
                                {amenity.charAt(0).toUpperCase() + amenity.slice(1).replace(/([A-Z])/g, ' $1')}
                            </label>
                        </div>
                    ))}
                </div>



                <div className=" flex flex-col">
                <p className='text-lg mt-6 font-semibold'>Upload Images</p>
                <input
                    type='file'
                    id='images'
                    onChange={(e) => setFiles(e.target.files)}
                    accept='.jpg,.png,.jpeg'
                    multiple
                    className='w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out'
                />
                {imageUploadError && <p className='text-red-600 mt-2'>{imageUploadError}</p>}
                <button
                    type='button'
                    onClick={handleImageSubmit}
                    className='mt-2 mb-6 w-full bg-blue-600 text-white py-3 px-7 rounded hover:bg-blue-700 active:bg-blue-800'
                >
                    {uploading ? 'Uploading...' : 'Upload Images'}
                </button>

                <div className='flex flex-wrap'>
                    {formData.imageUrls.map((url, index) => (
                        <div key={index} className='relative mr-2 mb-2'>
                            <img src={url} alt={`Image ${index + 1}`} className='w-20 h-20 object-cover' />
                            <button
                                type='button'
                                onClick={() => handleRemoveImage(index)}
                                className='absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full'
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>

                </div>

                <button type='submit' className='h-20 mt-6 w-full bg-blue-600 text-white py-3 px-7 rounded hover:bg-blue-700 active:bg-blue-800'>
                    Create Listing
                </button>
            </form>
        </main>
    );
}
