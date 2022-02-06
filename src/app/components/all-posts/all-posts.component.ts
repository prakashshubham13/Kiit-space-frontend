import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  posts: any = [];
  dropdown: String = '1';
  profile_id: any;
  like: boolean = false;
  searchValue: String = '';
  loading:boolean=true;
  constructor(private _postService: PostsService, private _router: Router) {
  }

  ngOnInit(): void {
    this.profile_id = localStorage.getItem('id');
    this.fetchAllPosts();
  }
  //Function to fetch all posts
  fetchAllPosts() {
    this._postService.getAllPosts()
      .subscribe(
        res => {this.posts = res;this.loading=false; },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login']);
            }
          }
        }
      )
  }
  //Function to like a post
  likeblog(id: any) {
    this.like = true;
    this._postService.likeblog({ id })
      .subscribe(
        res => { this.like = false; this.fetchAllPosts() },
        err => {
          this.like = false;
          console.log(err)
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login']);
            }
          }
        }
      )
  }
  //Function to unlike a post
  unlikeblog(id: any) {
    this.like = true;
    this._postService.unlikeblog({ id })
      .subscribe(
        res => {
          this.like = false;
          this.fetchAllPosts();
        },
        err => {
          this.like = false;
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }
}
