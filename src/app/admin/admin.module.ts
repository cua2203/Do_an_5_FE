import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { CategoryComponent } from './components/category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandComponent } from './components/brand/brand.component';
import { BrandAddComponent } from './components/brand/brand_add.component';
import { BrandEditComponent } from './components/brand/brand_edit.componenet';
import { ManageImageComponent } from '../manage-image/manage-image.component';



@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent,
    CategoryComponent,
    BrandComponent,
    BrandAddComponent,
    BrandEditComponent,
    ManageImageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
