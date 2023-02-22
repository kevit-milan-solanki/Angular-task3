import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DetailComponent} from "./detail-form/detail/detail.component";
import {DetailResolverService} from "./detail-form/detail-resolver.service";
import {AuthGuard} from "./auth.guard";


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {
    path: 'detail', component: DetailComponent,
    resolve:[DetailResolverService]
  },
  {path: '**', redirectTo: 'login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
