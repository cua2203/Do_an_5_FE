import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand_add.component.html',
})
export class BrandAddComponent implements OnInit{
    title="Add_Brand"
    form!: FormGroup;
    file!:File;

    constructor(private service:BrandService,private router: Router,private fb: FormBuilder,private cookie: CookieService){
    }

    ngOnInit(): void {
        this.form = this.fb.group({
          brand_name:['', [Validators.required,Validators.minLength(10),Validators.maxLength(100)]],
          image:['', [Validators.required]]
    
        })
      }

    onFileSelected(event : any) {
        const file:File = event.target.files[0] || "";
        this.file=file;
        this.form.value.image=file.name;
        console.log(this.form.value.image)
    }

    onSubmit() {
        const formData = new FormData();
        formData.append('file', this.file);
        this.service.upload('category',formData,this.cookie.get('token')).subscribe(()=>{console.log('ok')},(error)=>{
            console.log(error)
        });

    }




}
