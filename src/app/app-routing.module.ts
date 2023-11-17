import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth.guard';
import { ManageImageComponent } from './admin/manage-image/manage-image.component';


const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  {
    path: 'admin',
    loadChildren: () => AdminModule,
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => UserModule
  },
  {
    path:'image',
    component:ManageImageComponent
  },
  {
    path: 'login',
    component:LoginComponent,
  },
  // Các route khác cho cả dự án
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
