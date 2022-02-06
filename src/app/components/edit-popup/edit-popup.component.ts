import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.css']
})
export class EditPopupComponent implements OnInit {
  @Input() emailid: any;
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Output() updatePage: EventEmitter<any> = new EventEmitter();
  disable:boolean=false;
  postForm: FormGroup = this.fb.group({});
  constructor(private fb: FormBuilder, private _authService: AuthService, private _router: Router) { }
  ngOnInit(): void {
    this.postForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
      }
    );
  }
  //Update user Email Id
  updateUserEmail() {
    this.postForm.markAllAsTouched();
    if (!this.postForm.valid)
      return
      this.disable=true;
    let data = {
      email: this.postForm.get('email')?.value,
    }
    this._authService.updateProfile(data)
      .subscribe(res => {
        this.disable=false;
        this.closeModal.emit();
        this.updatePage.emit();
      },
        err => {
          this.disable=false;
          console.log(err)
        })
  }
  //Close pop up
  close() {
    this.closeModal.emit();
  }
}
