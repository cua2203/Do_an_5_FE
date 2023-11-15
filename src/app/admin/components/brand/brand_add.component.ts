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
        console.log(this.imagepath);
      }

    onFileSelected(event : any) {
        const file:File = event.target.files[0] || "";
        this.file=file;
        // this.form.value.image=file.name;
        // console.log(this.form.value.image)
    }

    async onSubmit() {
        const formData = new FormData();
        formData.append('file', this.file);
        await this.service.upload('category',formData,this.cookie.get('token')).subscribe((data)=>{
          console.log(data),this.image=data.filename;
          const brand:Brand={brand_name:this.form.value.brand_name,image:this.imagepath+data.filename,brand_id:1};
          this.service.add(brand,this.cookie.get('token')).subscribe((data)=>{console.log(data)},(error)=>{console.log(error)});
          this.router.navigate(['/admin/brand'])
        }
          ,(error)=>{
            console.log(error)
        });

       

    }




}
