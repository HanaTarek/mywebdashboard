import { Component } from '@angular/core';
import { SharedserviceService } from '../sharedservice.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  searchTerm: string = '';
  ISuserslist: boolean = false;
  constructor(private sharedService: SharedserviceService, private router: Router, private route: ActivatedRoute) { }

  onSearchChange(): void {
    this.sharedService.changeSearchTerm(this.searchTerm);
  }


  ngOnInit() {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentUrl = this.router.url;
        this.ISuserslist = (currentUrl === '/users' || currentUrl === '/') && !currentUrl.startsWith('/user/');
      });
  }


}
