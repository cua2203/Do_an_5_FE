import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IGetVariant, Ipagination } from 'src/app/model/laptop.model';
import { ImportBillService } from 'src/app/services/importBill.service';
import { LaptopService } from 'src/app/services/laptop.service';
import { constant, editor } from 'src/config/config';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  title = 'ProductDetail';
  editorData: string = '<p>Hello, CKEditor!</p>';
  editorConfig = editor.editorConfig;
  form!: FormGroup;
  quantity!: number;
  price!: number;
  variant_id!: number;

  Variant!: IGetVariant[];
  id: number = 0;

  constructor(private service: LaptopService, private cookie: CookieService, private importService: ImportBillService, private fb: FormBuilder, private route: ActivatedRoute,) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = Number(params['id']);
    });

    this.form = this.fb.group({
      laptop_id: [this.id, []],
      ram: ['', [Validators.required]],
      storage: ['', [Validators.required]],
      pin: ['', Validators.required],
      cpu: ['', [Validators.required]],
      var_image: ['', [Validators.required]],
      description: ['', [Validators.required]]

    })
    this.service.getVariant(this.id, this.cookie.get('token')).subscribe((data) => { this.Variant = data; console.log(this.Variant) });
  }

  onSubmit() {
    this.service.addVariant(this.form.value, this.cookie.get('token')).subscribe((data) => { console.log(data); this.detail(this.id) })

  }
  onDelete(id: number) {
    if (confirm("Delete this variant ?")) {
      this.service.deleteVariant(id, this.cookie.get('token')).subscribe(() => { this.detail(this.id) })

    }
  }
  onClick(id: number) {
    this.variant_id = id;
  }
  onImport() {
    let user_id = this.cookie.get('user_id');

    let bill = {
      user_id: user_id,
      variant_id: this.variant_id,
      quantity: this.quantity,
      price: this.price
    }
    console.log(bill);
    this.importService.create(bill,this.cookie.get('token')).subscribe((err)=>{console.log(err)})

  }

  choseImage(event: string) {
    this.form.get('var_image')?.setValue(constant.imagePath + event);
  }

  detail(id: number) {
    this.service.getVariant(id, this.cookie.get('token')).subscribe((data) => { this.Variant = data });
  }



}
