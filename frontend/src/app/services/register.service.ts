import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personas } from '../models/persona';
import { Usuarios } from '../models/usuario';

@Injectable({
    providedIn: 'root'
})
export class RegisterService{
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
    getRegisterByIdPersona(Cedula:string){
        return this.http.get(this.API_URL+`/register/Persona/${Cedula}`);
    }
    createRegisterPersona(user:Personas){
        console.log(this.API_URL+`/register/Persona/createRegisterPersona`);
        return this.http.post(this.API_URL+'/register/Persona/createRegisterPersona',user);
    }

    // Usuario
    createRegisterUsuario(user:Usuarios){
        console.log(this.API_URL+`/register/Usuario/createRegisterUsuario`);
        return this.http.post(this.API_URL+'/register/Usuario/createRegisterUsuario',user);
    }

}