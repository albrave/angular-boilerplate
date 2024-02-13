import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { getAuth, getIdToken } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData = signal<any>(null);
  message:any = null;

  constructor(
    private http: HttpClient,
    public afAuth: AngularFireAuth,
    public router: Router,
  ) { 
    this.afAuth.authState.subscribe(async (user:any) => {
      if (user) {
        let userTokenData:any = await user.getIdTokenResult();
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('claims', JSON.stringify(userTokenData.claims));
        JSON.parse(localStorage.getItem('user')!);
        this.userData.set(JSON.parse(localStorage.getItem('user')!));
      } else {
        localStorage.setItem('user', 'null');
        localStorage.setItem('claims', 'null');
        JSON.parse(localStorage.getItem('user')!);
        JSON.parse(localStorage.getItem('claims')!);
        this.userData.set(null);
      }
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.userData.set(JSON.parse(localStorage.getItem('user')!));
    return user !== null;
  }

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result:any) => {
        this.afAuth.authState.subscribe(async (user:any) => {
          if (user) {
            this.router.navigate(['']);
          }
        });
      })
      .catch((error:any) => {
        return error;
      });
  }

  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result:any) => {
        return {type:'ok', data:JSON.parse(JSON.stringify(result))};
      })
      .catch((error:any) => {
        return {type:'error', error: JSON.parse(JSON.stringify(error))};
      });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        return {type:'ok', message:'Please check your email. We\'ve just sent a link to reset your password'};
      })
      .catch((error:any) => {
        return {type:'error', message:error};
      });
  }


  // Sign out
  SignOut(redirect:boolean) {
    return new Promise((resolve,reject)=>{
        this.afAuth.signOut().then(() => {
          localStorage.removeItem('user');
          localStorage.removeItem('claims');
          if (redirect)
            this.router.navigate(['login']);

          resolve(true);
        });
    });
  }
  
  async getToken() {
    const auth = getAuth()
    const { currentUser } = auth
    if (currentUser) {
      const token = await getIdToken(currentUser,true);
      return token;
    }

    return null;
  }

  async getUserData() {
    let token = await this.getToken();
    if (token) {
      console.log(token);
      // @todo call api to get user data;
      let data = {};
      return data;
    } else {
      throw('No valid token')
    }
  }

}
