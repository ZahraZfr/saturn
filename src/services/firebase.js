import config from './config';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

export const app = initializeApp(config.firebase);
export const db = getDatabase(app);
