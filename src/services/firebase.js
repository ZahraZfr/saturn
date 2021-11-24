import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { browserPopupRedirectResolver,browserSessionPersistence} from 'firebase/auth';

import config from "./config";
export const app = initializeApp(config.firebase);
export const auth = initializeAuth(app , {
    persistence: browserSessionPersistence,
    popupRedirectResolver: browserPopupRedirectResolver,
});
export const db = getDatabase(app);

