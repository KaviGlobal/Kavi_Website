import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemsComponent } from './menu-items.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [MenuItemsComponent],
  imports: [
    CommonModule,
    BrowserModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  exports: [MenuItemsComponent]
})
export class MenuItemsModule { }
