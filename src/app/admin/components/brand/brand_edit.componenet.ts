import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BrandService } from 'src/app/services/brand.service';
import { constant } from 'src/config/config';

@Component({
  selector: 'app-brand',
  templateUrl: './brand_edit.component.html',
  // styleUrls: ['./brand.component.css']
})
export class BrandEditComponent implements OnInit {
  title = 'Edit_Brand';
  form!: FormGroup;
  file!: File;
  image: string = '';
  imagepath: string = constant.imagePath;

  constructor(
    private service: BrandService,
    private router: Router,
    private fb: FormBuilder,
    private cookie: CookieService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      brand_name: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
      image: ['', [Validators.required]],
    });
    console.log(this.imagepath);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0] || '';
    this.file = file;
    // this.form.value.image=file.name;
    // console.log(this.form.value.image)
  }

  onSubmit(){
    
  }
}
