import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { UserRoutingModule } from './user-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';



@NgModule({
  declarations: [
    ProfileComponent,
    LayoutComponent,
    HomeComponent,
    SlideshowComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule
  ]
})
export class UserModule { }
