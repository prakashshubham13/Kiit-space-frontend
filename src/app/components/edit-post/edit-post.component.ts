import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  constructor(private _postService: PostsService, private fb: FormBuilder, private _router: Router, private _activatedRoute: ActivatedRoute) { }
  posts: any;
  mycomment: String = '';
  disable = false;
  mssg: String = '';
  error: any;
  success: String = '';
  postForm: FormGroup = this.fb.group({});
  postid: any;
  ngOnInit(): void {
    this.postForm = this.fb.group(
      {
        title: ['', [Validators.required]],
        subject: ['', [Validators.required]],
        tags: ['', [Validators.required]],
      }
    );
    this._activatedRoute.paramMap.subscribe(res => {
      this.postid = res.get('postid');
    })

    //Fetching Particular blog by id
    this._postService.getSingleBlog(this.postid)
      .subscribe(
        res => {
          console.log(res), this.mycomment = '', this.posts = res;
          this.postForm.setValue({
            title: this.posts.title,
            subject: this.posts.subject,
            tags: this.posts.tags,
          })
        },
        err => {
          console.log(err)
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )



  }
  //Function to edit blog
  editBlog() {
    console.log((this.postForm.valid));
    this.mssg = !this.postForm.valid ? "All fields need to be filled" : '';
    if (!this.postForm.valid)
      return
    this.disable = true;
    console.log(this.postForm.get('tags')?.value)
    let tagarr = this.postForm.get('tags')?.value.toString().split(",");
    console.log(tagarr)
    let data = {
      "id": this.postid,
      "title": this.postForm.get('title')?.value,
      "subject": this.postForm.get('subject')?.value,
      "tags": tagarr,
    }
    this._postService.updateBlog(data)
      .subscribe(res => {
        this.disable = false;
        this.mssg = "Changes Saved"
        setTimeout(() => { this._router.navigate(['/myposts']) }, 2000)
      },
        err => {
          this.disable = false;
          this.mssg = err;
        })
  }
}

