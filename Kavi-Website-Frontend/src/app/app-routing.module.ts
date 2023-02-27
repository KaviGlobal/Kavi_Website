import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { RightMenuComponent } from './views/right-menu/right-menu.component';
import { RightMenuDetailsComponent } from './views/right-menu-details/right-menu-details.component';

const routes: Routes = [  
  { path: '', component: HomeComponent },
  { path: ':id', component: RightMenuComponent },
  { path: ':pageType/:id', component: RightMenuDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
