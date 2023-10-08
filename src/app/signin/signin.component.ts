import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {


errMessage:string=''
isLoading:boolean=false;

  constructor(private _Auth:AuthService,private _Router:Router){}

  loginForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern('^[A-Z][a-z][0-9]{4,8}')]),
  })





  signIn(signInForm:FormGroup){

    this.isLoading=true;

      this._Auth.logIn(signInForm.value).subscribe({
     next:(response)=>{
      if(response.message=='success'){
        localStorage.setItem('userToken',response.token)
        this._Auth.decodedUserData()
        this._Router.navigate(['/home'])

      }
      console.log(response)
      this.isLoading=false;

    },
     error:(err)=>{
     this.errMessage = err.error.message
     this.isLoading=false;

     }
})

  }


}
