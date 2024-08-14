import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { User } from '../user';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'photo', 'first_name', 'last_name', 'email'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService) {
    this.dataSource = new MatTableDataSource<User>();
  }

  ngOnInit() {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadUsers() {
    this.userService.getUsers(1).subscribe(
      (users: User[]) => {
        this.users = users;
        this.dataSource.data = this.users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
