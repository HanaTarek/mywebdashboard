import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../user';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedserviceService } from '../sharedservice.service';
import { forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  private searchSubscription: Subscription | undefined;
  isLoading: boolean = false;

  displayedColumns: string[] = ['id', 'photo', 'first_name', 'last_name', 'email'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private sharedService: SharedserviceService) {
    this.dataSource = new MatTableDataSource<User>();
  }

  goToUserDetail(id: string) {
    this.router.navigate(['/user', id]);
  }


  ngOnInit(): void {
    this.isLoading = true ;
    this.loadUsers();
    this.isLoading = false ;
    this.searchSubscription = this.sharedService.currentSearchTerm.subscribe(
      searchTerm => this.filterUsers(searchTerm)
    );

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUser(id);
    }
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadUsers() {
    forkJoin({
      page1: this.userService.getUsers(1).pipe(catchError(error => {
        console.error('Error fetching users from page 1:', error);
        return [];
      })),
      page2: this.userService.getUsers(2).pipe(catchError(error => {
        console.error('Error fetching users from page 2:', error);
        return [];
      })),
      page3: this.userService.getUsers(3).pipe(catchError(error => {
        console.error('Error fetching users from page 3:', error);
        return [];
      }))
    }).subscribe(
      (result: { page1: User[], page2: User[], page3: User[] }) => {
        this.users = [...result.page1, ...result.page2, ...result.page3];
        this.dataSource.data = this.users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  filterUsers(searchTerm: string): void {
    if (!searchTerm) {
      this.dataSource.data = this.users;
    } else {
      this.dataSource.data = this.users.filter(user =>
        user.id?.toString().includes(searchTerm)
      );
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  onPageChange(){
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 100);
  }

}
