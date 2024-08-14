import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { map, observable, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "https://reqres.in/api/users?page={page}";

  constructor( private http : HttpClient) { }
  users : Observable<User>[] = [];
  data : Observable<any> | undefined;

  getUsers(page: number): Observable<any> {

    return this.http.get<any>(this.url.replace('{page}', page.toString())).pipe(
      map(response => response.data as User[]));

  }
  
  listUsers(page: number): Observable<User[]> {
    const url = this.url.replace('{page}', page.toString());
    return this.http.get<any>(url).pipe(
      map(data => data)
    );
  }

  listUser(page: number): Observable<User[]> | undefined {
    const url = this.url.replace('{page}', page.toString());
    return this.http.get<any>(url).pipe(
      tap((data: any) => {
        for (const element of data.data) {
          this.users.push(element);
        }
      })
    );
  }


}
