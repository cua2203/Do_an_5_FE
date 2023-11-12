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

  form!: FormGroup;
 
  constructor(private service:LoginService,private router: Router,private fb: FormBuilder,private cookie: CookieService){
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      email:['phamcua670@gmail.com', [Validators.required,Validators.minLength(10),Validators.email]],
      password:['password1', [Validators.required,Validators.minLength(8)]]

    })
  }

  onSubmit() {
      this.service
        .login(
          this.form.value.email,this.form.value.password
        )
        .subscribe((data: any) => {
          console.log(data);
          this.cookie.set('token', data.token);
          if(data.roles=="User")
              this.router.navigate(['/user']);
          else
              this.router.navigate(['/admin']);
        },
        (err:any)=>{
          console.log(err);
          alert('Tài khoản hoặc mật khẩu không chính xác !')
       
        });
  }



}
