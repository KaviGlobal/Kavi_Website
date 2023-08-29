import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { RightMenuComponent } from './views/right-menu/right-menu.component';
import { RightMenuDetailsComponent } from './views/right-menu-details/right-menu-details.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RightMenuDetailsCardComponent } from './core/right-menu-details-card/right-menu-details-card.component';
const routes: Routes = [  
  { path: '', component: HomeComponent },
  { path: '404', component: PagenotfoundComponent },
  { path: ':id', component: RightMenuComponent },
  { path: ':pageType/:id', component: RightMenuDetailsComponent },
 /* children: [
    {path:  ':rightPageType', component:RightMenuDetailsCardComponent}
//    {path:'ancient', component:AncientComponent},
  ]}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
