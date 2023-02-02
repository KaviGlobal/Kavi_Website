import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MenuItemsComponent } from './menu-items.component';



@NgModule({
  declarations: [MenuItemsComponent],
  imports: [
    CommonModule,
    // BrowserModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  exports: [MenuItemsComponent]
})
export class MenuItemsModule { }
