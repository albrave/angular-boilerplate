import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { from, mergeMap, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { getAuth, getIdToken } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  
  constructor(
    public authService: AuthService,
    public router: Router
  ){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.authService.isLoggedIn) {
      this.router.navigate(['login'])
    }
    return true;
  }
}


export function authInterceptor (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  
  const auth = getAuth()
  const { currentUser } = auth;
  if (currentUser) {
    return from(getIdToken(currentUser,true)).pipe(
      mergeMap(token=>{
        console.log("TOKEN",token);
        console.log("REQUEST", req.url);
        if (token) {
          const cloneReq = req.clone({
            headers: req.headers.set('Authorization', token)
          })
          return next(cloneReq)
        }
        return next(req);
      })
    )
  }
  return next(req);

}

