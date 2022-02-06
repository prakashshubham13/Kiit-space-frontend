import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthGuard } from './guard/auth.guard';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { DeleteAlertComponent } from './components/delete-alert/delete-alert.component';
import { SearchfilterPipe } from './filter/searchfilter.pipe';
import { PrivatePipe } from './filter/private.pipe';
import { FeaturedPipe } from './filter/featured.pipe';
import { SortbydatePipe } from './filter/sortbydate.pipe';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { CommentPostComponent } from './components/comment-post/comment-post.component';
import { EditPopupComponent } from './components/edit-popup/edit-popup.component';
import { EditProfilePasswordComponent } from './components/edit-profile-password/edit-profile-password.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NoPostComponent } from './components/no-post/no-post.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    PageNotFoundComponent,
    AllPostsComponent,
    ProfileComponent,
    MyPostsComponent,
    DeleteAlertComponent,
    SearchfilterPipe,
    PrivatePipe,
    FeaturedPipe,
    SortbydatePipe,
    EditPostComponent,
    CommentPostComponent,
    EditPopupComponent,
    EditProfilePasswordComponent,
    NavbarComponent,
    FooterComponent,
    NoPostComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,AuthGuard,
    {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
