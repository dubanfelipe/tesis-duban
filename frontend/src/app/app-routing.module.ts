import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './components/home/home.component';
import { AdminComponent} from './components/admin/admin.component';
import { RegisterComponent} from './components/register/register.component';
import { LoginComponent} from './components/login/login.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { GuardsGuard } from './shared/guards.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { DataUsersComponent } from './components/data-users/data-users.component';
import { EditUsersComponent } from './components/edit-users/edit-users.component';
import { ActivateUsersComponent } from './components/activate-users/activate-users.component';
import { ActivateComponent } from './components/activate/activate.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent, canActivate: [GuardsGuard] },
  { path: 'admin/users', component: DataUsersComponent, canActivate: [GuardsGuard]},
  { path: 'admin/users/edit', component: EditUsersComponent, canActivate: [GuardsGuard]},
  { path: 'admin/activate', component: ActivateUsersComponent, canActivate: [GuardsGuard]},
  { path: 'admin/activate/users', component: ActivateComponent, canActivate: [GuardsGuard]},
  { path: 'usuarios', component: UsuariosComponent, canActivate: [GuardsGuard] },
  { path: 'usuarios/profile', component: ProfileComponent, canActivate: [GuardsGuard]},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
