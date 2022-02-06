import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
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
export class ForgotPasswordComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({});
  profile: any;
  error: any;
  success: any;
  disabled: any = false;
  constructor(private _auth: AuthService, private fb: FormBuilder, private _router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.email,Validators.pattern('^[1-9][0-9]{6}@kiit\.ac\.in$')]]
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
      "username": this.loginForm.get('username')?.value
    }
    alert('working');
    this._auth.resetUser(data)
      .subscribe(res => {
        // this.profile = res;
        this.error = ''
        this.success = "Login Successful"
        // setTimeout(() => { this._router.navigate(['/allposts']) }, 2000)
      },
        err => {
          this.disabled = false;
          this.error = err.error.result
        })
  }
}
