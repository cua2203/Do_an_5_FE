import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CategoryComponent } from './components/category/category.component';


const routes: Routes = [
  {
    path: '',
    component:LayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'category', component: CategoryComponent }
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
