import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms'
import { ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SmartTableModule } from 'ng2-smart-table';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { FooterComponent } from './components/footer/footer.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ProfileComponent } from './components/profile/profile.component';

import { RegisterService } from './services/register.service';
import { DataUsersComponent } from './components/data-users/data-users.component';
import { EditUsersComponent } from './components/edit-users/edit-users.component';
import { ActivateUsersComponent } from './components/activate-users/activate-users.component';
import { ActivateComponent } from './components/activate/activate.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { RutinasComponent } from './components/rutinas/rutinas.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { AsignarRutinasComponent } from './components/asignar-rutinas/asignar-rutinas.component';

import { MaterialModule } from './material/material.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { ChartsModule } from "ng2-charts";
import { UserRutinasComponent } from './components/user-rutinas/user-rutinas.component';
import { EstadisticasUserComponent } from './components/estadisticas-user/estadisticas-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    FooterComponent,
    UsuariosComponent,
    ProfileComponent,
    DataUsersComponent,
    EditUsersComponent,
    ActivateUsersComponent,
    ActivateComponent,
    SignInComponent,
    RegisterAdminComponent,
    RutinasComponent,
    ExerciseComponent,
    AsignarRutinasComponent,
    EstadisticasComponent,
    UserRutinasComponent,
    EstadisticasUserComponent,
  ],
  imports: [
    HttpClientModule,
    ChartsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Ng2SmartTableModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
