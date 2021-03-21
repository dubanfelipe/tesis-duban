import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule} from '@angular/forms'
import { ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SmartTableModule } from 'ng2-smart-table';  

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
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Ng2SmartTableModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
