import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
  @Input() owner: any = true;
  @Input() ownerusername: any;
  @Input() child: any = false;
  posts: any = [];
  profile_id: any;
  like: boolean = false;
  loading:boolean=true;
  constructor(private _postService: PostsService, private _router: Router) { }
  ngOnInit(): void {
    this.profile_id = localStorage.getItem('id');
    this.owner ? this.fetchMyPost() :
    this.fetchfetchPublicPost(this.ownerusername);
  }
// Funcyion to fetch my blog
  fetchMyPost() {
    this._postService.getMyPosts()
      .subscribe(
        res => { this.posts = res;this.loading=false; },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }



// Function to fetch public blog
  fetchfetchPublicPost(data: String) {
    // alert('ýes')
    this._postService.getPublicBlogs(data)
      .subscribe(
        res => { this.posts = res;this.loading=false; },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
            console.log(err)
          }
        }
      )

  }


// Fuction to make blog private/public
  togglelock(id: any, state: boolean) {
    let data = {
      id: id,
      value: !state
    }
    this._postService.tooglelock(data)
      .subscribe(
        res => { this.fetchMyPost() },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }

// Function to like a blog
  likeblog(id: any) {
    this.like = true;
    this._postService.likeblog({ id })
      .subscribe(
        res => {
          this.like = false;
          this.owner ? this.fetchMyPost() : this.fetchfetchPublicPost(this.ownerusername);
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


// Function to unlike a blog
  unlikeblog(id: any) {
    this.like = true;
    this._postService.unlikeblog({ id })
      .subscribe(
        res => {
          this.like = false;
          this.owner ? this.fetchMyPost() : this.fetchfetchPublicPost(this.ownerusername);
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
// Function to delete a blog
  deleteBlog(id: any) {
    this._postService.deleteBlog({ id })
      .subscribe(
        res => {
          this.fetchMyPost()
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
  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes.ownerusername.previousValue+"---"+changes.ownerusername.currentValue+"---"+this.ownerusername)
    // this.profile_id = localStorage.getItem('id');
    if(this.ownerusername!=null){this.owner ? this.fetchMyPost() :
    this.fetchfetchPublicPost(changes.ownerusername.currentValue);}
  }
}



