import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"lockbox-a244c","appId":"1:608617893636:web:f3488a1f6b0044d41c8a51","storageBucket":"lockbox-a244c.appspot.com","apiKey":"AIzaSyAEUxjTMRqoEC96Ok8BtvcnSr8hyiBL3Uw","authDomain":"lockbox-a244c.firebaseapp.com","messagingSenderId":"608617893636"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
