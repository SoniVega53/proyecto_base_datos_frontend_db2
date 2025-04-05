import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration,} from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './ui/home/home.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { LoginComponent } from './ui/login/login.component';
import { UserComponent } from './ui/user/user.component';
import { RegisterComponent } from './ui/register/register.component';
import { PerfilComponent } from './ui/perfil/perfil.component';
import { IsEmptyComponent } from './ui/is-empty/is-empty.component';
import { ComponentMainComponent } from './ui/main/component-main/component-main.component';
import { PermisosUsuariosComponent } from './ui/user-action/permisos-usuarios/permisos-usuarios.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { ActionDataBasePageComponent } from './ui/base/action-data-base-page/action-data-base-page.component';
import { QueryEjecutablePageComponent } from './ui/base/query-ejecutable-page/query-ejecutable-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    PerfilComponent,
    IsEmptyComponent,
    ComponentMainComponent,
    PermisosUsuariosComponent,
    ActionDataBasePageComponent,
    QueryEjecutablePageComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule,CodemirrorModule],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
