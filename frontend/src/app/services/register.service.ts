import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personas } from '../models/persona';
import { Usuarios } from '../models/usuario';
import { facultades } from '../models/Facultad';
import { roles } from '../models/rol';
import { Estudiante } from '../models/estudiante';
import { PERSONA } from '../models/PERSONAS';
import { sedes} from '../models/sede';

@Injectable({
    providedIn: 'root'
})
export class RegisterService{

    personas: PERSONA[];
    Facultad: facultades[];
    sede: sedes[];
    Rol: roles[];

    API_URL = 'http://localhost:3000/api';
    constructor(private http: HttpClient) {}

    getRegister(){
        return this.http.get(this.API_URL+"/register");
    } 
    // Persona
    getRegisterByIdPersonaCedula(Cedula:number){
        return this.http.get(this.API_URL+`/register/Persona/${Cedula}`);
    }
    getRegisterByIdPersonaActivo(Activo:number){
        return this.http.get(this.API_URL+`/register/Persona/Activate/${Activo}`);
    }
    createRegisterPersona(user:Personas){
        return this.http.post(this.API_URL+'/register/Persona/createRegisterPersona',user);
    }
    updateRegisterByIdPersona(id:number, updateRegister: Personas) {
        return this.http.put(this.API_URL+`/register/Persona/${id}`,updateRegister);
    }
    deleteRegisterByIdPersona(id:number){
        return this.http.delete(this.API_URL+`/register/Persona/${id}`);
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
    deleteRegisterByIdUsuario(id:number){
        return this.http.delete(this.API_URL+`/register/Usuario/${id}`);
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
    deleteRegisterByIdEstudiante(id:number){
        return this.http.delete(this.API_URL+`/register/Estudiante/${id}`);
    }
    // Facultad
    getFacultades(){
        return this.http.get(this.API_URL+"/register/Facultades");
    }  
    // Roles
    getRoles(){
        return this.http.get(this.API_URL+"/register/Roles");
    } 
    // Sede
    getSede(){
        return this.http.get(this.API_URL+"/register/Sede");
    }

}