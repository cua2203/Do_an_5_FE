import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CategoryComponent } from './components/category/category.component';
import { BrandComponent } from './components/brand/brand.component';
import { BrandAddComponent } from './components/brand/brand_add.component';
import { BrandEditComponent } from './components/brand/brand_edit.componenet';


const routes: Routes = [
  {
    path: '',
    component:LayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'brand' ,children: [
        {path:'',component: BrandComponent},
        {path:'add',component:BrandAddComponent},
        {path:'edit/:id',component:BrandEditComponent}
      ] }
      // Thêm các route khác cho trang admin
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminRoutingModule { }
