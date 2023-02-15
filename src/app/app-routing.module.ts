import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DetailFormComponent} from "./detail-form/detail-form.component";
import {DetailComponent} from "./detail-form/detail/detail.component";


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {path: 'detail-form', component: DetailFormComponent},
  {path: 'detail', component: DetailComponent},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
