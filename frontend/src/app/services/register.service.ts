import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personas } from '../models/persona';
import { Usuarios } from '../models/usuario';
import { facultades } from '../models/Facultad';
import { roles } from '../models/rol';
import { Estudiante } from '../models/estudiante';

@Injectable({
    providedIn: 'root'
})
export class RegisterService{

    Facultad: facultades[];
    Rol: roles[];

    API_URL = 'http://localhost:3000/api';
    constructor(private http: HttpClient) {}

    getRegister(){
        return this.http.get(this.API_URL+"/register");
    }    
    getRegisterById(id:number){
        return this.http.get(this.API_URL+`/register/${id}`);
    }
    deleteRegisterById(id:number){
        return this.http.get(this.API_URL+`/register/${id}`);
    }
    updateRegisterById(id:number, updateRegister: Personas) {
        return this.http.put(this.API_URL+`/register/${id}`,updateRegister);
    }

    // Persona
    getRegisterByIdPersonaId(user:number){
        return this.http.get(this.API_URL+`/register/Persona/${user}`);
    }
    getRegisterByIdPersonaCedula(Cedula:number){
        return this.http.get(this.API_URL+`/register/Persona/${Cedula}`);
    }
    createRegisterPersona(user:Personas){
        return this.http.post(this.API_URL+'/register/Persona/createRegisterPersona',user);
    }
    updateRegisterByIdPersona(id:number, updateRegister: Personas) {
        return this.http.put(this.API_URL+`/register/Persona/${id}`,updateRegister);
    }

    // Usuario
    getRegisterByIdUsuarioCelular(Celular:string){
        return this.http.get(this.API_URL+`/register/Usuario/Celular/${Celular}`);
    }
    getRegisterByIdUsuario(Cedula:string){
        return this.http.get(this.API_URL+`/register/Usuario/${Cedula}`);
    }
    createRegisterUsuario(user:Usuarios){
        return this.http.post(this.API_URL+'/register/Usuario/createRegisterUsuario',user);
    }
    updateRegisterByIdUsuario(id:number, updateRegister: Usuarios) {
        return this.http.put(this.API_URL+`/register/Usuario/${id}`,updateRegister);
    }

    //Estudiante
    createRegisterEstudiante(user:Estudiante){
        return this.http.post(this.API_URL+'/register/Estudiante/createRegisterEstudiante',user);
    }
    getRegisterByIdEstudiante(Cedula:string){
        return this.http.get(this.API_URL+`/register/Estudiante/${Cedula}`);
    }
    updateRegisterByIdEstudiante(id:number, updateRegister: Estudiante) {
        return this.http.put(this.API_URL+`/register/Estudiante/${id}`,updateRegister);
    }

    // Facultad
    getFacultades(){
        return this.http.get(this.API_URL+"/register/Facultades");
    }  


    // Roles
    getRoles(){
        return this.http.get(this.API_URL+"/register/Roles");
    } 

}