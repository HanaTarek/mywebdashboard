import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-displayuser',
  templateUrl: './displayuser.component.html',
  styleUrl: './displayuser.component.css'
})
export class DisplayuserComponent {

  user : Observable<User> | undefined;
  userId : string ='';

  constructor( private userService : UserService, private router: Router, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
       this.user = this.userService.getUser(this.userId);
        console.log(" recipe data" + this.user);
    });

  }

  gotoHomePage(){
    if (this.router) {
      this.router.navigate(['/users']);
    }
  }
}
