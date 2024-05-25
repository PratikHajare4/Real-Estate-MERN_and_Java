import express from "express";
import {getUserListings} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/listings', getUserListings)

export default router;