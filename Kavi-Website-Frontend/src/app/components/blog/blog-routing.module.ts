import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { HomeComponent } from '../home/home.component';
import { BlogPostComponent } from '../blog-post/blog-post.component';

const routes: Routes = [
//   {
//   path: '', component:  BlogComponent,
//     children: [
//       { path: 'blog-post', component: BlogPostComponent },
//     ],
// },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
