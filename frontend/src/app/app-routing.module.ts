import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { RutinasComponent } from './components/rutinas/rutinas.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { AsignarRutinasComponent } from './components/asignar-rutinas/asignar-rutinas.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { UserRutinasComponent } from './components/user-rutinas/user-rutinas.component';
import { NewGuardsGuard } from './shared/newGuards/new-guards.guard';
import { EstadisticasUserComponent } from './components/estadisticas-user/estadisticas-user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin/users', component: DataUsersComponent, canActivate: [GuardsGuard]},
  { path: 'admin/users/edit', component: EditUsersComponent, canActivate: [GuardsGuard]},
  { path: 'admin/sign_in', component: SignInComponent, canActivate: [GuardsGuard]},
  { path: 'admin/users/edit', component: EditUsersComponent, canActivate: [GuardsGuard]},
  { path: 'admin/activate', component: ActivateUsersComponent, canActivate: [GuardsGuard]},
  { path: 'admin/activate/users', component: ActivateComponent, canActivate: [GuardsGuard]},  
  { path: 'admin/register', component: RegisterAdminComponent, canActivate: [GuardsGuard]},
  { path: 'admin/exercise', component: ExerciseComponent, canActivate: [GuardsGuard]},
  { path: 'admin/routines/:id', component: RutinasComponent, canActivate: [GuardsGuard]},
  { path: 'admin/routines', component: RutinasComponent, canActivate: [GuardsGuard]},
  { path: 'admin/assignRoutines', component: AsignarRutinasComponent, canActivate: [GuardsGuard]},
  { path: 'admin/estadisticas', component: EstadisticasComponent, canActivate: [GuardsGuard]},
  { path: 'usuarios/profile', component: ProfileComponent, canActivate: [NewGuardsGuard]},
  { path: 'usuarios/rutinas', component: UserRutinasComponent, canActivate: [NewGuardsGuard]},
  { path: 'usuarios/estadisticas', component: EstadisticasUserComponent, canActivate: [NewGuardsGuard]},
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
