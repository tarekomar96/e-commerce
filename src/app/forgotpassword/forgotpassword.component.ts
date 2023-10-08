import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
succesMessage:string=''
errMessage:string=''

constructor(private _Auth:AuthService,private _Route:Router){}

forgotForm:FormGroup = new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email])
})



verifyForm:FormGroup = new FormGroup({
  resetCode:new FormControl(null,[Validators.required])
})



verifyCode(verfiyCode:FormGroup){
console.log(verfiyCode)
this._Auth.verifyCode(verfiyCode.value).subscribe({
  next:(response)=>{
    console.log(response)
    if(response.status == 'Success'){
      this._Route.navigate(['/resetpassword'])
    }
  },
  error:(err)=>{
console.log(err)
  }
})
}




forgotPassword(forgotForm:FormGroup){
this._Auth.forgotPassword(forgotForm.value).subscribe({
  next:(response)=>{
    this.succesMessage = response.message
    this.errMessage = '';
    document.querySelector('.forgotpassword')?.classList.add('d-none')
    document.querySelector('.verifyCode')?.classList.remove('d-none')
  },
  error:(err)=>{
    this.errMessage = err.error.message
  }
})
}



}
