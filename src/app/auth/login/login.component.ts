import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  showPassword: boolean = false;

  form!: FormGroup;
 
  constructor(private service:LoginService,private router: Router,private fb: FormBuilder,private cookie: CookieService){
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      email:['user1@example.com', [Validators.required,Validators.minLength(10),Validators.email]],
      password:['password1', [Validators.required,Validators.minLength(8)]]

    })
  }

  onSubmit() {
      this.service
        .login(
          this.form.value.email,this.form.value.password
        )
        .subscribe((data: any) => {
          this.cookie.set('token', data.token);
          this.cookie.set('roles', data.roles);
          console.log(data);
          if(data.roles=="User" || data.roles=="Admin")
              this.router.navigate(['/admin']);
          else 
              this.router.navigate(['/user']);
        },
        (err:any)=>{
          console.log(err);
          alert('Tài khoản hoặc mật khẩu không chính xác !')
       
        });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  



}
