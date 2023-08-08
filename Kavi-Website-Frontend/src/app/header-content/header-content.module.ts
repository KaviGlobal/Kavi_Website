import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderContentComponent } from './header-content.component';
import { MenuItemsModule } from './menu-items/menu-items.module';
import { HeaderContentRoutingModule } from './header-content-routing.module';

@NgModule({
  declarations: [
    HeaderContentComponent
  ],
  imports: [
    CommonModule,
    MenuItemsModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    HttpClientModule,
    HeaderContentRoutingModule
  ],  
  exports: [HeaderContentComponent],
  // entryComponents: [MenuItemsComponent]
})
export class HeaderContentModule { }
