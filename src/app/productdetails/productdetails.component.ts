import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../service/cart.service';
import Swal from 'sweetalert2';

ActivatedRoute
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent {

  productId:any;
  productDetails:any;
  constructor(private _ActivatedRoute:ActivatedRoute,private _DataService:DataService,private _CartService:CartService){

    this._ActivatedRoute.paramMap.subscribe((param)=>{
      this.productId = param.get('id')
    })

    this.getDetails()
  }


  getDetails(){
    this._DataService.getProductDetails(this.productId).subscribe((response)=>{
this.productDetails = response.data
    })
  }



  addToCartFromCartdetails(productId:string){
    this._CartService.addToCart(productId).subscribe({
      next:(response)=>{
        console.log(response)
        if(response.status == 'success'){
          this._CartService.numberOfCartItem.next(response.numOfCartItems)
          Swal.fire({
            icon: 'success',
            title: '',
            text: response.message,
           
          })
          
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
    }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
  
    },
    nav: true
  }
}


