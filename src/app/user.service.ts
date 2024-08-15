import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { map, observable, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "https://reqres.in/api/users?page={page}";
  oneUrl = "https://reqres.in/api/users/{id}";

  constructor( private http : HttpClient) { }
  users : Observable<User>[] = [];
  data : Observable<any> | undefined;

  getUsers(page: number): Observable<any> {

    return this.http.get<any>(this.url.replace('{page}', page.toString())).pipe(
      map(response => response.data as User[]));

  }

  getUser(id: string): Observable<User> {
    const url = this.oneUrl.replace('{id}', id);

    return this.http.get<any>(url).pipe(
      map(response => {
        if (response.data) {
          return response.data as User;
        } else {
          throw new Error('User not found');
        }
      })
    );
  }




}
