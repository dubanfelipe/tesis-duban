import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './components/home/home.component';
import { AdminComponent} from './components/admin/admin.component';
import { RegisterComponent} from './components/register/register.component';
import { LoginComponent} from './components/login/login.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { GuardsGuard } from './shared/guards.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { DataUsersComponent} from './components/data-users/data-users.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent, canActivate: [GuardsGuard] },
  { path: 'admin/users', component: DataUsersComponent, canActivate: [GuardsGuard]},
  { path: 'usuarios', component: UsuariosComponent, canActivate: [GuardsGuard] },
  { path: 'usuarios/profile', component: ProfileComponent, canActivate: [GuardsGuard]},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
