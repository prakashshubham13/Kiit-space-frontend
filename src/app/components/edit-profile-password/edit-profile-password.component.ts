import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-edit-profile-password',
  templateUrl: './edit-profile-password.component.html',
  styleUrls: ['./edit-profile-password.component.css']
})
export class EditProfilePasswordComponent implements OnInit {
  @Input() val: any;
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  postForm: FormGroup = this.fb.group({});
  disable: boolean = false;
  success: boolean = false;
  error: boolean = false;
  mssg: String = '';
  constructor(private _auth: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.postForm = this.fb.group(
      {
        oldpassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
        passwordGroup: this.fb.group({
          password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
          confirmpassword: ['', [Validators.required]],
        }, { validator: this.passwordMatcher }),
      }
    );
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
  // Function to update user password
  updateUserPassword() {
    this.postForm.markAllAsTouched();
    if (!this.postForm.valid)
      return
    this.disable = true;
    let data = {
      oldpassword: this.postForm.get('oldpassword')?.value,
      newpassword: this.postForm.get('passwordGroup')?.get('password')?.value
    }

    this._auth.updateProfilePassword(data)
      .subscribe(res => {
        this.disable = false;
        this.success = true;
        this.mssg = 'Password Changed Successfully';
        this.error = false;
        setTimeout(() => { this._auth.logoutUser(); }, 2000)
      },
        err => {
          this.disable = false;
          this.error = true; this.mssg = 'Incorrect Password';
          this.success = false;
          setTimeout(() => { this._auth.logoutUser(); }, 2000);
        }
      )
  }
  // Function to close modal
  close() {
    this.closeModal.emit();
  }
}
