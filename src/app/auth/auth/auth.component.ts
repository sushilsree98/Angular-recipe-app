import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogging: boolean = false;
  isLoading: boolean = false;
  error: string = '';

  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitch(){
    this.isLogging = !this.isLogging;
  }

  onSubmit(form:NgForm){
    if(!form.valid){
      return
    }
    this.isLoading = true;

    if(this.isLogging){
      const mail = form.value.email;
      const password = form.value.password;

      this.authService.signin(mail, password)
        .subscribe(res => {
          console.log(res);
          this.isLoading = false;
          this.router.navigate(['recipe'])
        }, error_message => {
          this.isLoading = false;
          this.error = "Invalid username or password";
        })
    }else{
      const mail = form.value.email;
      const password = form.value.password;
  
      this.authService.signUp(mail,password)
        .subscribe(res=>{
          console.log(res);
          this.isLoading = false;
        },error_message=>{
          this.isLoading = false;
          this.error = error_message;
        })
        
    }
  }

  onErrorHandle(){
    this.error = null
  }
}
