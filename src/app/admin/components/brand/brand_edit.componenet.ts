import { Component, OnInit,Renderer2, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Brand } from 'src/app/model/brand.model';
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
  id: number = 0;

  constructor(
    private service: BrandService,
    private router: Router,
    private fb: FormBuilder,
    private cookie: CookieService,
    private route: ActivatedRoute,
    private renderer: Renderer2, private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      brand_name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      image: ['', [Validators.required]],
    });

    this.route.params.subscribe((params) => {
      this.id = params['id'];
      // Sử dụng giá trị `id` ở đây
    });

    this.getById();
  }

  getById() {
    this.service
      .getById(this.id, this.cookie.get('token'))
      .subscribe((data) => {
        this.form.get('brand_name')?.setValue(data.brand_name),
          this.form.get('image')?.setValue(data.image);
      });
  }

  choseImage(event: string) {
    this.form.get('image')?.setValue(constant.imagePath+event);
    const modal = document.getElementById('modal');
    const fade = document.getElementsByClassName('modal-backdrop');
    (modal as HTMLElement).style.display='none';
    (fade[0] as HTMLElement).style.display = 'none';
  }
  

  onSubmit() {
    const brand:Brand={brand_name:this.form.value.brand_name,image:this.form.value.image,brand_id:this.id};
    this.service.update(brand,this.cookie.get('token')).subscribe(()=>{
      this.router.navigate(['/admin/brand'])
    });
  }


}
