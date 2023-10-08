import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../service/cart.service';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  productId:string='';

  constructor(private _cartService:CartService){}

  payment:FormGroup = new FormGroup({

    details:new FormControl(null),
    phone:new FormControl(null),
    city:new FormControl(null)

  })




  navigateToPage(url:string){

    window.location.href=url;
  }


  ngOnInit(): void {
    this._cartService.getLoggedUserCart().subscribe({
      next:(response)=>{
        
      this.productId=response.data._id
    }
      
    })
  }


  onlinePayment(payment:FormGroup){
this._cartService.handlePayment(this.productId,payment.value).subscribe({
  next:(response)=>{
    console.log(response)
    if(response.status == 'success'){
     this.navigateToPage(response.session.url)

    }
    
  }
  
})
  }

}
