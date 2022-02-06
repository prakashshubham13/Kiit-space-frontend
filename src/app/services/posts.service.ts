import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private allblogsUrl = "http://localhost:5000/users/blogs";
  private myblogsUrl = "http://localhost:5000/users/myblogs";
  private addblogsUrl = "http://localhost:5000/users/addblog";
  private togglelockUrl = "http://localhost:5000/users/updatevisible";
  private likeblogUrl = "http://localhost:5000/users/likeblog";
  private unlikeblogUrl = "http://localhost:5000/users/unlikeblog";
  private deleteblogUrl = "http://localhost:5000/users/deleteblog";
  private publicblogUrl = "http://localhost:5000/users/publicblogs";
  private singleblogUrl = "http://localhost:5000/users/getsingleblog";
  private commentblogUrl = "http://localhost:5000/users/commentpost";
  private updateblogUrl = "http://localhost:5000/users/editblog";
  private deleteblogcommentUrl = "http://localhost:5000/users/deleteblogcomment";
  private editblogcommentUrl = "http://localhost:5000/users/editblogcomment";
  constructor(private http: HttpClient) { }

  getAllPosts() {
    return this.http.get<any>(this.allblogsUrl);
  }

  getMyPosts() {
    return this.http.get<any>(this.myblogsUrl);
  }

  addPosts(post: any) {
    return this.http.post<any>(this.addblogsUrl, post);
  }
  tooglelock(post: any) {
    return this.http.post<any>(this.togglelockUrl, post);
  }

  likeblog(post: any) {
    return this.http.post<any>(this.likeblogUrl, post);
  }

  unlikeblog(post: any) {
    return this.http.post<any>(this.unlikeblogUrl, post);
  }
  deleteBlog(post: any) {
    return this.http.post<any>(this.deleteblogUrl, post);
  }

  getPublicBlogs(username: String) {
    return this.http.get<any>(this.publicblogUrl + username);
  }
  getSingleBlog(id: String) {
    return this.http.get<any>(this.singleblogUrl + id);
  }
  postComment(comment: any) {
    return this.http.post<any>(this.commentblogUrl, comment);
  }
  updateBlog(comment: any) {
    return this.http.post<any>(this.updateblogUrl, comment);
  }
  deleteBlogComment(comment: any) {
    return this.http.post<any>(this.deleteblogcommentUrl, comment);
  }
  editBlogComment(comment: any) {
    return this.http.post<any>(this.editblogcommentUrl, comment);
  }
}
