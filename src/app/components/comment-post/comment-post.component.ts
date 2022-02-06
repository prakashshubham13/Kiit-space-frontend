import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-comment-post',
  templateUrl: './comment-post.component.html',
  styleUrls: ['./comment-post.component.css']
})
export class CommentPostComponent implements OnInit {
  constructor(private _postService: PostsService, private _router: Router, private fb: FormBuilder, private _activatedRoute: ActivatedRoute) { }
  posts: any;
  mycomment: String = '';
  disable = false;
  postid: any;
  userid:any;
  commentid:any;
  mssg:String='';
  comment:any;
  commentpopup:boolean=false;
  postForm: FormGroup = this.fb.group({});
  ngOnInit(): void {
    this.postForm = this.fb.group(
      {
        text: ['', [Validators.required]],
      });
    this._activatedRoute.paramMap.subscribe(res => {
      this.postid = res.get('postid');
      this.getBlogById(res.get('postid'));
    })
    this.userid=localStorage.getItem('id');
  }

  //Funtion to get blog by id
  getBlogById(id: any) {
    this._postService.getSingleBlog(id)
      .subscribe(
        res => { this.mycomment = '', this.posts = res;console.log(res); },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }

// Function to post a comment
  postComment() {
    this.disable = true;
    let data = { id: this.postid, comment: this.mycomment };
    this._postService.postComment(data)
      .subscribe(
        res => { this.mycomment = '',this.disable = false; this.getBlogById(this.postid) },
        err => {
          this.disable = false;
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }
// Function to delete a comment
  deleteComment(id:any){
      this._postService.deleteBlogComment({ postid:this.postid,commentid:id })
        .subscribe(
          res => {
           this.getBlogById(this.postid);
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
// Function to update a comment
  updateComment(){
    if (!this.postForm.valid)
    return
    this._postService.editBlogComment({ postid:this.postid,commentid:this.commentid,comment:this.postForm.get('text')?.value})
    .subscribe(
      res => {
        this.mssg="Changes saved";
       this.getBlogById(this.postid);
       setTimeout(() => {this.togglePopUp();this.mssg='';}, 2000)
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
// Function to open comment popup
togglePopUp(id:any='',comment:any=''){
  this.commentid=id;
  this.comment=comment;
this.commentpopup=this.commentpopup?false:true;
this.postForm.setValue({
  text: this.comment
})
}
}
