import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderContentRoutingModule } from './header-content-routing.module';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { MenuItemsModule } from './menu-items/menu-items.module';
import { HeaderContentComponent } from './header-content.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

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
  ],  
  exports: [HeaderContentComponent],
  // entryComponents: [MenuItemsComponent]
})
export class HeaderContentModule { }
