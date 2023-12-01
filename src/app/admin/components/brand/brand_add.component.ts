import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Brand } from 'src/app/model/brand.model';
import { BrandService } from 'src/app/services/brand.service';
import {constant} from 'src/config/config'

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand_add.component.html',
})
export class BrandAddComponent implements OnInit{
    title="Add_Brand"
    form!: FormGroup;
    file!:File;
    image:string="";
    imagepath:string=constant.imagePath;
    

    constructor(private service:BrandService,private router: Router,private fb: FormBuilder,private cookie: CookieService){
    }

    ngOnInit(): void {
        this.form = this.fb.group({
          brand_name:['', [Validators.required,Validators.minLength(3),Validators.maxLength(100)]],
          image:['', [Validators.required]]
    
        })
      }

    choseImage(event: string) {
      this.form.get('image')?.setValue(constant.imagePath+event);
      const modal = document.getElementById('modal');
      const fade = document.getElementsByClassName('modal-backdrop');
      (modal as HTMLElement).style.display='none';
      (fade[0] as HTMLElement).style.display = 'none';
    
    }

    onSubmit() {
       
      const brand:Brand={brand_name:this.form.value.brand_name,image:this.form.value.image,brand_id:1};
      this.service.add(brand,this.cookie.get('token')).subscribe((data)=>{console.log(data)},(error)=>{console.log(error)});
      this.router.navigate(['/admin/brand'])

    }




}
