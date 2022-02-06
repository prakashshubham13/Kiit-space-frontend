import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ height: '0vh', opacity: 0 }),
        animate(300, style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate(300, style({ height: '0', opacity: 0 })),
      ]),
    ]),
    trigger('slide', [
      transition(':enter', [
        style({ width: '0vw', opacity: 0 }),
        animate(700, style({ width: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate(700, style({ width: '0', opacity: 0 })),
      ]),
    ]),
    trigger('new', [
      transition(':enter', [
        style({opacity:0 }),
        animate(500,style({ opacity:1 }))
      ]),
      transition(':leave', [
        animate(500, style({ opacity:0})),
      ]),
    ]),
  ]

})
export class ProfileComponent implements OnInit {
  profileDetails: any;
  popup: boolean = false;
  postForm: FormGroup = this.fb.group({});
  mssg: String = '';
  disabled: boolean = false;
  load: boolean = true;
  error: String = '';
  success: String = '';
  admin: boolean = false;
  deleteModal: boolean = false;
  editModal: boolean = false;
  editPasswordModal: boolean = false;
  child: boolean = true;
  constructor(private _postService: PostsService, private _auth: AuthService, private _router: Router, private fb: FormBuilder, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this._activatedRoute.paramMap.subscribe(res => {
      res.get('username') === localStorage.getItem('id') || res.get('username') === '_self' ?
        this.getProfileDetails() : this.getPublicProfileDetails(res.get('username'));
    })
    this.postForm = this.fb.group(
      {
        title: ['', [Validators.required]],
        subject: ['', [Validators.required]],
        tags: ['', [Validators.required]],
      }
    );

  }

// Function to get personal profile details
  getProfileDetails() {
    this.admin = true;
    this._auth.getProfileDetails()
      .subscribe(
        res => { this.profileDetails = res; },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }
// Function to get public profile details
  getPublicProfileDetails(data: any) {
    this._auth.getPublicProfileDetails(data)
      .subscribe(
        res => { this.profileDetails = res; },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }
// Toggle add form popup
  togglepopup() {
    this.popup = this.popup ? false : true;
  }
// Toggle delete form popup
  toggleDeleteModal() {
    this.deleteModal = this.deleteModal ? false : true;
  }
// Toggle edit form popup
  toggleEditModal() {
    this.editModal = this.editModal ? false : true;
  }
  // Toggle edit password popup
  toggleEditPasswordModal() {
    this.editPasswordModal = this.editPasswordModal ? false : true;
  }
  // Function to add a blog
  addPost() {
    this.mssg = !this.postForm.valid ? "All fields need to be filled" : '';
    if (!this.postForm.valid)
      return
    this.disabled = true;
    let tagarr = this.postForm.get('tags')?.value.split(",");
    let data = {
      "creator_name": localStorage.getItem('id'),
      "title": this.postForm.get('title')?.value,
      "subject": this.postForm.get('subject')?.value,
      "tags": tagarr,
    }
    this._postService.addPosts(data)
      .subscribe(res => {
        this.disabled = false;
        this.mssg = "Blog added successfully";
        setTimeout(() => { this._router.navigate(['/allposts']) }, 2000)
      },
        err => {
          this.disabled = false;
          this.mssg = "error occured";
        })
  }
  // Function to delete a user account
  deleteUser() {
    this._auth.deleteUser()
      .subscribe(
        res => {
          this._auth.logoutUser();
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }
}
