import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IGetLaptop, Ipagination } from 'src/app/model/laptop.model';
import { LaptopService } from 'src/app/services/laptop.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title="Laptop"
  Laptop:IGetLaptop[]=[];
  Variant!:any[];

  Pagination:Ipagination={
    searchString: "",
    pageIndex :1,
    pageSize :5,
    sort:1
  }

  constructor(private service:LaptopService,private cookie:CookieService){

  }
  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(){
    this.service.getAll(this.Pagination,this.cookie.get('token')).subscribe((data)=>{this.Laptop=data;console.log(data)});
  }

  detail(id:number){
    this.service.getVariant(id,this.cookie.get('token')).subscribe((data)=>{this.Variant=data})
  }

  pageSizeChange(){
    this.getProduct()
  }
  search(){
    this.getProduct();
  }
  sortChange(){
    this.Pagination.pageIndex=1;
    this.getProduct();

  }
  onDelete(id:number){
    this.service.delete(id,this.cookie.get('token')).subscribe(()=>{
      this.getProduct();

    })
  }


}
