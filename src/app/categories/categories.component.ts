import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{

  categories:any[]=[];

  constructor(private _DataService:DataService){}

ngOnInit(): void {

  this.getCategories()
  
}

  getCategories(){
    this._DataService.getData('categories').subscribe((response)=>{
      this.categories=response.data
    })
  }

}
