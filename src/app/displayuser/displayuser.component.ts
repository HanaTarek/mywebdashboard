import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-displayuser',
  templateUrl: './displayuser.component.html',
  styleUrl: './displayuser.component.css'
})
export class DisplayuserComponent {

  user : Observable<User> | undefined;

  constructor( private userService : UserService) {
    this.user = this.userService.getUser('2');
    
  }

  ngOnInit(): void {
  }
}
