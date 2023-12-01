import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Brand } from 'src/app/model/brand.model';
import { Icategory } from 'src/app/model/category.model';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { LaptopService } from 'src/app/services/laptop.service';
import { constant, editor } from 'src/config/config';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent {
  title = 'Edit Product';
  category!: any[];
  brand!: Brand[];
  form!: FormGroup;
  id!: number;

  constructor(
    private cateService: CategoryService,
    private cookie: CookieService,
    private brandService: BrandService,
    private fb: FormBuilder,
    private productService: LaptopService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = Number(params['id']);
    });

    this.form = this.fb.group({
      id:['',[]],
      laptop_name: ['', [Validators.required]],
      image: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      brand_id: ['', [Validators.required]],
    });

    this.productService
      .GetById(this.id, this.cookie.get('token'))
      .subscribe((data) => {
        this.form.setValue({
          id:this.id,
          laptop_name: data.laptop_name,
          image: data.image,
          category_id: data.category_id,
          brand_id: data.brand_id
        });
      });
    this.getAllCategory();
    this.getAllBrand();
  }
  onSubmit() {
    this.productService
      .update(this.form.value, this.cookie.get('token'))
      .subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/admin/product']);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  choseImage(event: string) {
    this.form.get('image')?.setValue(constant.imagePath + event);
    const modal = document.getElementById('modal');
    const fade = document.getElementsByClassName('modal-backdrop');
    (modal as HTMLElement).style.display = 'none';
    (fade[0] as HTMLElement).style.display = 'none';
  }

  choseImage1(event: string) {
    this.form.get('var_image')?.setValue(constant.imagePath + event);
  }

  getAllBrand() {
    this.brandService.getAll(this.cookie.get('token')).subscribe(
      (data: Brand[]) => {
        this.brand = data;
        console.log(data);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

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
}
