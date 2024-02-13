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
    importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":environment.firebase.projectId,"appId":environment.firebase.appId,"storageBucket":environment.firebase.storageBucket,"apiKey":environment.firebase.apiKey,"authDomain":environment.firebase.authDomain,"messagingSenderId":environment.firebase.messagingSenderId}))),
    importProvidersFrom(provideAuth(() => getAuth()))]

};
