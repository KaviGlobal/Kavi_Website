import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../body-content/body-content.module').then(module => module.BodyContentModule),
        data: { title: 'Home' }
      },
      {
        path: 'blog',
        loadChildren: () => import('../components/blog/blog.module').then(module => module.BlogModule),
        data: { title: 'Blog' }
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
