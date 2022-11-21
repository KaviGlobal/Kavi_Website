import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss']
})
export class MenuItemsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MenuItemsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    // console.log(this.data);
    this.httpClient.get("https://kavi-strapi-app.azurewebsites.net/api/left-menus?populate=%2A").subscribe((data: any) => {
      console.log(data);
    });
    // https://kavi-strapi-app.azurewebsites.net/api/left-menus?populate=%2A
  }

  modalClose() {
    this.dialogRef.close(false)
  }

}
