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
            park: false
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
        } else if (id === 'parking' || id === 'furnished' || id === 'offer') {
            setFormData({
                ...formData,
                [id]: checked
            });
        } else if (id in formData.amenities) {
            setFormData({
                ...formData,
                amenities: {
                    ...formData.amenities,
                    [id]: checked
                }
            });
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
            const res = await fetch(`${baseURL}/api/listing/create`, {  // Corrected endpoint
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
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <p>Name</p>
                    <input onChange={handleChange} value={formData.name} type="text" placeholder='Name' className='border text-black border-rose-300 p-3 rounded-lg' id="name" maxLength="62" minLength="10" required />
                    <p>Description</p>
                    <input onChange={handleChange} value={formData.description} type="text" placeholder='Description' className='border border-rose-300 p-3 rounded-lg' id="description" required />
                    <p>Address</p>
                    <input onChange={handleChange} value={formData.address} type="text" placeholder='Address' className='border border-rose-300 p-3 rounded-lg' id="address" required />
                    <p>Apartments</p>
                    <input onChange={handleChange} value={formData.apartments} type="text" placeholder='Apartments' className='border border-rose-300 p-3 rounded-lg' id="apartments" required />
                    <p>Total Area</p>
                    <input onChange={handleChange} value={formData.totalArea} type="text" placeholder='Total Area' className='border border-rose-300 p-3 rounded-lg' id="totalArea" required />
                    <p>Project RERA ID</p>
                    <input onChange={handleChange} value={formData.projectRERAID} type="text" placeholder='Project RERA ID' className='border border-rose-300 p-3 rounded-lg' id="projectRERAID" required />
                    <p>Possession Date</p>
                    <input onChange={handleChange} value={formData.possessionDate} type="text" placeholder='Possession Date' className='border border-rose-300 p-3 rounded-lg' id="possessionDate" required />
                    <p>Carpet Range</p>
                    <input onChange={handleChange} value={formData.carpetRange} type="text" placeholder='Carpet Range' className='border border-rose-300 p-3 rounded-lg' id="carpetRange" required />
                    
                    <p>Amenities</p>
                    <div className='flex gap-4'>
                        <label className='flex items-center gap-2'>
                            <input type="checkbox" id="gym" onChange={handleChange} checked={formData.amenities.gym} className='w-4 h-4' />
                            Gym
                        </label>
                        <label className='flex items-center gap-2'>
                            <input type="checkbox" id="pool" onChange={handleChange} checked={formData.amenities.pool} className='w-4 h-4' />
                            Pool
                        </label>
                        <label className='flex items-center gap-2'>
                            <input type="checkbox" id="park" onChange={handleChange} checked={formData.amenities.park} className='w-4 h-4' />
                            Park
                        </label>
                        {/* Add more amenities as needed */}
                    </div>
                </div>
                <div className='flex flex-col gap-4 flex-1'>
                    <p>Bedrooms</p>
                    <input onChange={handleChange} value={formData.bedrooms} type="number" placeholder='Bedrooms' className='border border-rose-300 p-3 rounded-lg' id="bedrooms" min="1" required />
                    <p>Bathrooms</p>
                    <input onChange={handleChange} value={formData.bathrooms} type="number" placeholder='Bathrooms' className='border border-rose-300 p-3 rounded-lg' id="bathrooms" min="1" required />
                    <p>Regular Price</p>
                    <input onChange={handleChange} value={formData.regularPrice} type="number" placeholder='Regular Price' className='border border-rose-300 p-3 rounded-lg' id="regularPrice" min="1" required />
                    <p>Discount Price</p>
                    <input onChange={handleChange} value={formData.discountPrice} type="number" placeholder='Discount Price' className='border border-rose-300 p-3 rounded-lg' id="discountPrice" min="0" required />
                    <div className='flex gap-4'>
                        <label className='flex items-center gap-2'>
                            <input type="checkbox" id="parking" onChange={handleChange} checked={formData.parking} className='w-4 h-4' />
                            Parking
                        </label>
                        <label className='flex items-center gap-2'>
                            <input type="checkbox" id="furnished" onChange={handleChange} checked={formData.furnished} className='w-4 h-4' />
                            Furnished
                        </label>
                        <label className='flex items-center gap-2'>
                            <input type="checkbox" id="offer" onChange={handleChange} checked={formData.offer} className='w-4 h-4' />
                            Offer
                        </label>
                    </div>
                    <div className='flex gap-4'>
                        <button type="button" id="sale" onClick={handleChange} className={`p-3 rounded-lg ${formData.type === 'sale' ? 'bg-rose-300' : 'bg-gray-200'}`}>Sale</button>
                        <button type="button" id="rent" onClick={handleChange} className={`p-3 rounded-lg ${formData.type === 'rent' ? 'bg-rose-300' : 'bg-gray-200'}`}>Rent</button>
                    </div>
                    <p>Images (6 max):</p>
                    <div className='border border-rose-300 p-3 rounded-lg'>
                        <input type="file" accept="image/*" multiple onChange={(e) => setFiles(Array.from(e.target.files))} />
                        <button type="button" onClick={handleImageSubmit} className='bg-rose-300 p-3 rounded-lg mt-2'>Upload Images</button>
                        {imageUploadError && <p className="text-red-500 mt-2">{imageUploadError}</p>}
                        <div className='flex gap-4 mt-2'>
                            {formData.imageUrls.map((url, index) => (
                                <div key={index} className='relative'>
                                    <img src={url} alt="uploaded" className='w-20 h-20 object-cover' />
                                    <button type="button" onClick={() => handleRemoveImage(index)} className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6'>X</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex-1 flex items-center justify-center'>
                    <button type="submit" className='bg-rose-500 text-white p-3 rounded-lg'>Create Listing</button>
                </div>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
        </main>
    );
}
