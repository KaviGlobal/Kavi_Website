import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuItemService } from 'src/app/services/menu-item.service';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss']
})
export class MenuItemsComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<MenuItemsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private httpClient: HttpClient,private menuItemservice: MenuItemService) {
  }

  ngOnInit(): void {
    this.menuItemservice.getMenuItems().subscribe((data: any) => {
      console.log(data);
    })
  }

  modalClose() {
    this.dialogRef.close(false)
  }

}
