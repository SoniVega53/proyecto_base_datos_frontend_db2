import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './ui/home/home.component';
import { LoginComponent } from './ui/login/login.component';
import { UserComponent } from './ui/user/user.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthenticatedGuard } from './auth/AuthenticatedGuard';
import { RegisterComponent } from './ui/register/register.component';
import { PerfilComponent } from './ui/perfil/perfil.component';
import { PermisosUsuariosComponent } from './ui/user-action/permisos-usuarios/permisos-usuarios.component';
import { ActionDataBasePageComponent } from './ui/base/action-data-base-page/action-data-base-page.component';
import { QueryEjecutablePageComponent } from './ui/base/query-ejecutable-page/query-ejecutable-page.component';

const routes: Routes = [
  {path:"home",component:HomeComponent, canActivate: [AuthGuard]},
  {path:"login",component:LoginComponent, canActivate: [AuthenticatedGuard]},
  {path:"register",component:RegisterComponent, canActivate: [AuthenticatedGuard]},
  {path:"users",component:UserComponent, canActivate: [AuthGuard]},
  {path:"perfil",component:PerfilComponent, canActivate: [AuthGuard]},
  {path:"user-edit",component:PermisosUsuariosComponent, canActivate: [AuthGuard]},
  {path:"action-db",component:ActionDataBasePageComponent, canActivate: [AuthGuard]},
  {path:"query-ejecutable",component:QueryEjecutablePageComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
