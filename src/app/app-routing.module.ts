import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { CommentPostComponent } from './components/comment-post/comment-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'forgotpassowrd',component:ForgotPasswordComponent},
  {path:'allposts',component:AllPostsComponent,canActivate:[AuthGuard]},
  {path:'profile/:username',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'myposts',component:MyPostsComponent,canActivate:[AuthGuard]},
  {path:'comment/:postid',component:CommentPostComponent,canActivate:[AuthGuard]},
  {path:'editpost/:postid',component:EditPostComponent,canActivate:[AuthGuard]},
  {path:"**",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{   scrollPositionRestoration: 'enabled',})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
