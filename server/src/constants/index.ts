import dotEnv from 'dotenv';

dotEnv.config();

export const PORT_NUMBER = process.env.PORT_NUMBER;
export const SCRAPE_TARGET_URL = 'https://opportunitiesinfo.com/category/'