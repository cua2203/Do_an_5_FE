import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Icategory } from 'src/app/model/category.model';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  title = 'Category';
  category!: Icategory[];
  cat!:Icategory;
  category_name!:string;
  category_name_add!:string;

  constructor(
    private service: CategoryService,
    private cookie: CookieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.service.getAll(this.cookie.get('token')).subscribe(
      (data: Icategory[]) => {
        this.category = data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  };
  onEdit(id: number): void {
    // this.route.params.subscribe((params) => {
    //   let id = params['id'];
    // });
    this.service.getById(id,this.cookie.get('token')).subscribe((data)=>{
      this.cat = data;
      this.category_name =data.category_name;

    })
  }

  onUpdate():void{
    this.service.update({id:this.cat.category_id,name:this.category_name},this.cookie.get('token')).subscribe(()=>{this.getAll()},
      (error:any)=>{
      console.log(error);
    });

  }
  onStore():void{
    this.service.add({name:this.category_name_add},this.cookie.get('token')).subscribe(()=>{this.getAll()},
    (error:any)=>{
    console.log(error);
  });
  }

  onDelete(id:number):void{
    this.service.delete(id,this.cookie.get('token')).subscribe(()=>{alert("Đã xóa!"),this.getAll()},(error:any)=>{
      console.log(error);
    })

  }


}
