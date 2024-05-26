import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required : true,
        },
        description: {
            type: String,
            required : true,
        },
        address:{
            type: String,
            required : true,
        },
        regularPrice:{
            type: Number,
            required : true,
        },
        discountPrice: {
            type: Number,
            required : true,
        },
        bathrooms: {
            type: Number,
            required: true,
        },
        bedrooms:{
            type: Number,
            required: true,
        },
        furnished: {
            type: Boolean,
            required: true,
        },
        parking: {
            type: Boolean,
            required: true,
        },
        type:{
            type: String,
            required : true,
        },
        offer:{
            type: Boolean,
            required: true,
        },
        imageUrls:{
            type: Array,
            required: true,
        },
        apartments: {
            type: String,
            required: true,
        },
        totalArea: {
            type: String,
            required: true,
        },
        projectRERAID: {
            type: String,
            required: true,
        },
        possessionDate: {
            type: String,
            required: true,
        },
        carpetRange: {
            type: String,
            required: true
        },
        amenities: {
            gym: {
                type: Boolean,
                default: false
            },
            pool: {
                type: Boolean,
                default: false
            },
            park: {
                type: Boolean,
                default: false
            },
            garden: {
                type: Boolean,
                default: false
            },
            maintenanceStaff: {
                type: Boolean,
                default: false
            },
            powerBackup: {
                type: Boolean,
                default: false
            },
            elevator: {
                type: Boolean,
                default: false
            },
            waterSupply: {
                type: Boolean,
                default: false
            },
            carParking: {
                type: Boolean,
                default: false
            },
            cctv: {
                type: Boolean,
                default: false
            },
            indoorGames: {
                type: Boolean,
                default: false
            },
            clubHouse: {
                type: Boolean,
                default: false
            },
            joggingTrack: {
                type: Boolean,
                default: false
            },
            rainwaterHarvesting: {
                type: Boolean,
                default: false
            },
            sewageTreatment: {
                type: Boolean,
                default: false
            },
            swimmingPool: {
                type: Boolean,
                default: false
            }
        },
    },
    {timestamps: true}
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
