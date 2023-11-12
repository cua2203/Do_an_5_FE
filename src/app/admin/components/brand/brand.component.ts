import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/services/brand.service';
import { Brand } from 'src/app/model/brand.model';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  // styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit{
  title='Brand';
  brand!:Brand[];

  constructor(
    private service: BrandService,
    private cookie: CookieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getAll();
    
  }


  getAll(){
    this.service.getAll(this.cookie.get('token')).subscribe(
      (data: Brand[]) => {
        this.brand = data;
        console.log(data)
      },
      (err: any) => {
        console.log(err);
      }
    );
  };

  onDelete(id:number){
    this.service.delete(id,this.cookie.get('token')).subscribe(()=>{alert("Đã xóa!"),this.getAll()},(error:any)=>{
      console.log(error);
    })

  }



}
