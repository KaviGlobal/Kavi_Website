import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MenuItemsComponent } from './menu-items/menu-items.component';

@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.scss']
})
export class HeaderContentComponent implements OnInit {
  menuItems: any = [];
  modalRefUnsubscribe!: Subscription;
  isFixed: boolean = false;
  constructor(private dialog: MatDialog, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  openMenu(): void {
    const dialogRef = this.dialog.open(MenuItemsComponent, {
      width: '100%',
      position: {
        top: '10px',
      },
      panelClass: '',
      data: this.menuItems
    });
    this.modalRefUnsubscribe = dialogRef.afterClosed().subscribe(result => {

    });
  }

  ngOnDestroy(): void {
    if (this.modalRefUnsubscribe) {
      this.modalRefUnsubscribe.unsubscribe();
    }
  }
}
