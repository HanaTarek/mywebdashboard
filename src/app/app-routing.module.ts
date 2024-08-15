import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserslistComponent } from "./userslist/userslist.component";
import { DisplayuserComponent } from "./displayuser/displayuser.component";

const routes: Routes = [
  {path: '', component: UserslistComponent},
  {path: 'users', component: UserslistComponent},
  {path: 'user/:id', component: DisplayuserComponent},
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
