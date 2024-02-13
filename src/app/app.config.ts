import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from '../environment/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"addo24h","appId":"1:744544179520:web:0b31c7c2355cee09ddd6a5","storageBucket":"addo24h.appspot.com","apiKey":"AIzaSyC3EWke0DoTBR5R9YRWY8fOYzBhyAVV-zw","authDomain":"addo24h.firebaseapp.com","messagingSenderId":"744544179520"}))),
    importProvidersFrom(provideAuth(() => getAuth()))]

};
