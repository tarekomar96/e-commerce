import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../service/cart.service';
import Swal from 'sweetalert2';
import { WishService } from '../service/wish.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


catData:any[]=[];
products:any[]=[];
brands:any[]=[];
constructor(private _DataService:DataService,private _cartService:CartService,private _WishService:WishService){


}


ngOnInit(): void {
  this.getCategories()
  this.getBrands()
  this.getProducts()
}



addToWishlist(productId:string){
this._WishService.addToWishlist(productId).subscribe({
  next:(response)=>{
    
    console.log(response)
    if(response.status == 'success'){
      
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


addToCart(productId:string){
this._cartService.addToCart(productId).subscribe({
  next:(response)=>{
    console.log(response)
    if(response.status == 'success'){
      this._cartService.numberOfCartItem.next(response.numOfCartItems)
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



getCategories(){
  this._DataService.getData('categories').subscribe((response)=>{
    this.catData=response.data

  })
}


getBrands(){
  this._DataService.getData('brands').subscribe((response)=>{
    this.brands=response.data.slice(0,4)

  })
}



getProducts(){
  this._DataService.getData('products').subscribe((response)=>{
    this.products=response.data

  })
}



customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  autoplay:true,
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 4
    },
    940: {
      items: 5
    }
  },
  nav: true
}

}
