import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  emailRegx = signal(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
  phoneRegx = signal(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
  weekday = signal({
      'en':["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      'it':["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"]
  });
  constructor() { }
}
