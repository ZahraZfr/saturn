import config from "./config";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

export const app = initializeApp(config.firebase);
export const auth = initializeAuth(app);
export const db = getDatabase(app);