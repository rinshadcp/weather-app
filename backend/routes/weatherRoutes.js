import express from 'express';
import { getWeather, getHistoricalData } from '../controllers/weatherController.js';

const router = express.Router();

router.get('/current', getWeather);
router.get('/historical', getHistoricalData);

export default router;