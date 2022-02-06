import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = "http://localhost:5000/users";
  private _loginUrl = "http://localhost:5000/users/login";
  private _resetUrl = "http://localhost:5000/users/reset"
  private _profileUrl = "http://localhost:5000/users/profile";
  private _publicprofileUrl = "http://localhost:5000/users/publicprofile";
  private _deleteUserUrl = "http://localhost:5000/users/deleteuser";
  private _updateProfileUrl = "http://localhost:5000/users/updateprofile";
  private _updateProfilePasswordUrl = "http://localhost:5000/users/updateprofilepassword";
  constructor(private http: HttpClient, private _router: Router) { }

  registerUser(user: any) {
    return this.http.post<any>(this._registerUrl, user);
  }
  resetUser(user: any) {
    return this.http.post<any>(this._resetUrl, user);
  }
  loginUser(user: any) {
    return this.http.post<any>(this._loginUrl, user);
  }
  updateProfile(user: any) {
    return this.http.post<any>(this._updateProfileUrl, user);
  }
  updateProfilePassword(user: any) {
    return this.http.post<any>(this._updateProfilePasswordUrl, user);
  }
  getProfileDetails() {
    return this.http.get<any>(this._profileUrl);
  }
  deleteUser() {
    return this.http.post<any>(this._deleteUserUrl, {});
  }
  getPublicProfileDetails(username: String) {
    return this.http.get<any>(this._publicprofileUrl + username);
  }
  loggedIn() {
    return !!localStorage.getItem('token')
  }
  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.clear();
    this._router.navigate(['/login'])
  }
  getToken() {
    return localStorage.getItem('token')
  }
}
