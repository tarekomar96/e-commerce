import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
HttpClient
@Injectable({
  providedIn: 'root'
})
export class CartService {

baseUrl:string='https://ecommerce.routemisr.com'
numberOfCartItem = new BehaviorSubject(0);

  constructor(private _HttpClient:HttpClient) { 
   
    this.getLoggedUserCart().subscribe({
      next:(response)=>{
        
      this.numberOfCartItem.next(response.numOfCartItems)
      },
      error:(err)=>{console.log(err)}
    })
  }
headers:any={
  token:localStorage.getItem('userToken')
}


  addToCart(Id:string):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/cart`,

    {

      productId:Id

    },
    {
      headers:this.headers

    })
  }


  getLoggedUserCart():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`,

    {
      headers:this.headers

    })
  }



  removeCartItem(Id:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${Id}`,

  
    {
      headers:this.headers

    })
  }



  updateCartItem(Id:string,count:number):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/v1/cart/${Id}`,
   {
count:count

   },

    {
      headers:this.headers

    })
  }



  handlePayment(productId:string,shippingAddress:any):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${productId}?url=http://localhost:4200`,
   {
    shippingAddress:shippingAddress

   },

    {
      headers:this.headers

    })
  }

}
