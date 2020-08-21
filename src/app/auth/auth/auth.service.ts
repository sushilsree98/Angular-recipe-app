import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs'
import { User } from './user.model';
import { Router } from '@angular/router';

 export interface SignUpResponse {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null)
  constructor(private http:HttpClient,private router:Router) { }

  signUp(email, password){
    return this.http.post<SignUpResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBC4-kwDlgWZEnvCk2W_1yYzuEugu6bi1s",
    {
      email : email,
      password : password,
      returnSecureToken : true
    }
    )
      .pipe(catchError(this.errorHandler),tap(data => {
        this.AuthHandler( data.email, data.localId, data.idToken, +data.expiresIn)
      }))
    
  }

  signin(email, password){
    return this.http.post<SignUpResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBC4-kwDlgWZEnvCk2W_1yYzuEugu6bi1s",{
      email: email,
      password: password,
      returnSecureToken: true
    }
    )
      .pipe(catchError(this.errorHandler), tap(data => {
        this.AuthHandler(data.email, data.localId, data.idToken, +data.expiresIn)
      }))
  }

  autoLogin(){

    const user:{
      email: string,
      userId: string,
      _token: string,
      _expiry: string
    } = JSON.parse(localStorage.getItem('user'))

    if(!user){
      return;
    }

    const loadedUser = new User(user.email,user.userId,user._token, new Date(user._expiry))

    if(loadedUser.token){
      this.user.next(loadedUser);
    }
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  private AuthHandler(
    email:string,
    userId:string,
    token:string,
    expiresIn: number
  ){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
    localStorage.setItem('user',JSON.stringify(user));
  }

  private errorHandler(err:HttpErrorResponse){
  
      let error_message = "An Unknown Error Occurred";
      if (!err.error || !err.error.error) {
        return throwError(error_message);
      } else {
        switch (err.error.error.message) {
          case 'EMAIL_EXISTS':
            error_message = "This Email already exists";
            break;
          case 'EMAIL_NOT_FOUND':
            error_message = "This Email doesn't exist";
            break;
          case 'INVALID_PASSWORD':
            error_message = 'This password is incorrect';
            break;
        }
      }
      return throwError(error_message);
  }
}
