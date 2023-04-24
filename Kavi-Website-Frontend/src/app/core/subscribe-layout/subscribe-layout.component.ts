import { Component, OnInit } from '@angular/core';
import { RightMenuService } from 'src/app/views/right-menu/right-menu.service';

@Component({
  selector: 'app-subscribe-layout',
  templateUrl: './subscribe-layout.component.html',
  styleUrls: ['./subscribe-layout.component.scss']
})
export class SubscribeLayoutComponent implements OnInit {
  public isSubscribed:  boolean = false;
  constructor(private rightMenuService: RightMenuService) { }

  ngOnInit(): void {
  }
  public emailSubscription(email:any){   
    let emailValidation = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
    let valid = emailValidation.test(email);
    console.log("email..",valid);
    if(valid){
      //call API
      this.rightMenuService.emailSubscription(email).then((response: any) => {
        if(response.data){
          this.isSubscribed = true
        }
        else
          this.isSubscribed = false
      })
    }
    else{
      //error message
      this.isSubscribed = false
    }
    console.log(valid);    
  }

}
