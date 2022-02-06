import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('scrolldown', [
      transition(':enter', [
        style({  marginTop:'-500px' }),
        animate(1000, style({ marginTop:'*' }))
      ]),
      transition(':leave', [
        animate(300, style({ })),
      ]),
    ]),
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({});
  profile: any;
  error: any;
  success: any;
  disabled: any = false;
  constructor(private _auth: AuthService, private fb: FormBuilder, private _router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      }
    );
  }

  // Function to login user
  loginUser() {
    this.loginForm.markAllAsTouched();
    if (!this.loginForm.valid)
      return
    this.disabled = true;
    let data = {
      "username": this.loginForm.get('username')?.value,
      "password": this.loginForm.get('password')?.value
    }
    this._auth.loginUser(data)
      .subscribe(res => {
        localStorage.setItem('token', res.token)
        localStorage.setItem('id', res.username);
        this.profile = res.username;
        this.error = ''
        this.success = "Login Successful"
        setTimeout(() => { this._router.navigate(['/allposts']) }, 2000)
      },
        err => {
          this.disabled = false;
          this.error = err.error.result
        })
  }
}
