import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WishService {

  baseUrl:string='https://ecommerce.routemisr.com'

  constructor(private _HttpClient:HttpClient) { }

  headers:any={
    token:localStorage.getItem('userToken')
  }

  addToWishlist(Id:string):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/wishlist`,

    {

      productId:Id

    },
    {
      headers:this.headers

    })
  }



  getLoggedUserWishlist():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/wishlist`,

    {
      headers:this.headers

    })
  }




  removeWishlistItem(Id:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/wishlist/${Id}`,

  
    {
      headers:this.headers

    })
  }


}
