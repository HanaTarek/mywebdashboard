import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {

  private searchTermSource = new BehaviorSubject<string>('');
  currentSearchTerm = this.searchTermSource.asObservable();

  constructor() { }

  changeSearchTerm(searchTerm: string) {
    this.searchTermSource.next(searchTerm);
  }
  
}
