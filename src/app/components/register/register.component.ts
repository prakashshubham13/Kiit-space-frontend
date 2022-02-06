import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('scrollup', [
      transition(':enter', [
        style({  marginTop:'500px' }),
        animate(1000, style({ marginTop:'*' }))
      ]),
      transition(':leave', [
        animate(300, style({ })),
      ]),
    ]),
  ]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = this.fb.group({});
  profile: any;
  disable: boolean = false;
  error: any;
  success: any;
  constructor(private _auth: AuthService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {


  }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email,Validators.pattern('^[1-9][0-9]{6}@kiit\.ac\.in$')]],
        passwordGroup: this.fb.group({
          password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
          confirmpassword: ['', [Validators.required]],
        }, { validator: this.passwordMatcher }),
      }
    );
  }
  registerUser() {
    this.registerForm.markAllAsTouched();
    if (!this.registerForm.valid)
      return
    this.disable = true;
    let data = {
      "username": this.registerForm.get('username')?.value,
      "email": this.registerForm.get('email')?.value,
      "password": this.registerForm.get('passwordGroup')?.get('password')?.value
    }
    this._auth.registerUser(data)
      .subscribe(res => {
        this.disable = false;
        localStorage.setItem('token', res.token)
        localStorage.setItem('id', res.username)
        this.profile = res.id
        this.error = ''
        this.success = "Account Created Successful"
        setTimeout(() => { this.router.navigate(['/allposts']) }, 2000)
      },
        err => {
          this.disable = false;
          this.error = err.error.result
        })
  }

  passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
    const passwordControl = c.get('password');
    const confirmControl = c.get('confirmpassword');

    if (passwordControl?.pristine || confirmControl?.pristine) {
      return null;
    }

    if (passwordControl?.value === confirmControl?.value) {
      return null;
    }

    return { match: true };

  }
}
