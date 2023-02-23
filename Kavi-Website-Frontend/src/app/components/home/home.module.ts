import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { HomeRoutingModule } from './home-routing.module';
import {CardLayoutModule} from '../../core/card-layout/card-layout.module'
// import {VerticalCardModule} from '../../reusable_card_components/vertical-card/vertical-card.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CardLayoutModule,
    // VerticalCardModule,
    AgmCoreModule
  ]
})
export class HomeModule { }
