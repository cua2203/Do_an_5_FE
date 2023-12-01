import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Brand } from 'src/app/model/brand.model';
import { Icategory } from 'src/app/model/category.model';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { LaptopService } from 'src/app/services/laptop.service';
import { constant,editor } from 'src/config/config';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  title = 'Add Product';
  category!: any[];
  brand!: Brand[];
  form!: FormGroup;

  constructor(
    private cateService: CategoryService,
    private cookie: CookieService,
    private brandService: BrandService,
    private fb: FormBuilder,
    private productService: LaptopService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      laptop_name:['', [Validators.required]],
      image:['', [Validators.required]],
      category_id:['',[Validators.required]],
      brand_id:['',[Validators.required]],
      ram:['',[Validators.required]],
      storage:['',[Validators.required]],
      pin:['',Validators.required],
      cpu:['',[Validators.required]],
      var_image:['',[Validators.required]],
      description:[this.editorData,[Validators.required]]

    })
    this.getAllCategory();
    this.getAllBrand();
  }
  onSubmit(){
    this.productService.add(this.form.value,this.cookie.get('token')).subscribe((data)=>{console.log(data); this.router.navigate(['/admin/product'])},(error)=>{console.log(error)});

    console.log(this.form.value)

  }

  
  choseImage(event: string) {
    this.form.get('image')?.setValue(constant.imagePath+event);
    const modal = document.getElementById('modal');
    const fade = document.getElementsByClassName('modal-backdrop');
    (modal as HTMLElement).style.display='none';
    (fade[0] as HTMLElement).style.display = 'none';
  
  }

  choseImage1(event: string) {
    this.form.get('var_image')?.setValue(constant.imagePath+event);
  
  
  }

  getAllBrand(){
    this.brandService.getAll(this.cookie.get('token')).subscribe(
      (data: Brand[]) => {
        this.brand = data;
        console.log(data)
      },
      (err: any) => {
        console.log(err);
      }
    );
  };

  getAllCategory() {
    this.cateService.getAll(this.cookie.get('token')).subscribe(
      (data: Icategory[]) => {
        this.category = data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  editorData: string = '<p>Hello, CKEditor!</p>';
  editorConfig = editor.editorConfig;
  
}
