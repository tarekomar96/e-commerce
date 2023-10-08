import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent {


  errMessage:string=''
  isLoading:boolean=false;
  
    constructor(private _Auth:AuthService,private _Router:Router){}
  
    resetForm:FormGroup = new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      newPassword:new FormControl(null,[Validators.required,Validators.pattern('^[A-Z][a-z][0-9]{4,8}')]),
    })
  
  
  
  
  
    resetPassword(formData:FormGroup){
     this.isLoading = true;
      console.log(formData)
    this._Auth.resetPassword(formData.value).subscribe({
    next:(response)=>{
    console.log(response)
    this.isLoading=false;
    if(response.token){
      this._Router.navigate(['/signin'])
    }
   },
    error:(err)=>{
   console.log(err)
   this.isLoading=false;
   this.errMessage = err.error.message
   
   }
    })
  
    }
  

}
