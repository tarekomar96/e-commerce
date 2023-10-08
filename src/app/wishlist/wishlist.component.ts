import { Component, OnInit } from '@angular/core';
import { WishService } from '../service/wish.service';
import { CartService } from '../service/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  cartDetails:any;

  constructor(private _WishService:WishService,private _CartService:CartService){}


  ngOnInit(): void {
    this.getWishlist()
  }


  getWishlist(){
    this._WishService.getLoggedUserWishlist().subscribe({
      next:(response)=>{
        console.log(response)
        this.cartDetails = response.data
        
      }
    })
  
  }




  removeWishItem(productId:string){
    this._WishService.removeWishlistItem(productId).subscribe({
      next:(response)=>{
       console.log(response)
     
      this.getWishlist()
      },
      error:(err)=>{console.log(err)}
    })
    }



    
    addToCartFromWishlist(productId:string){
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
            this.removeWishItem(productId)
            
          }
        },
        error:(err)=>{
          console.log(err)
        }
      })
      }


}
