import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/Users';

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
    createRegister(user:Users){
        console.log(this.API_URL+`/register/createRegister`);
        return this.http.post(this.API_URL+'/register/createRegister',user);
    }
    deleteRegisterById(id:number){
        return this.http.get(this.API_URL+`/register/${id}`);
    }
    updateRegisterById(id:number, updateRegister: Users) {
        return this.http.put(this.API_URL+`/register/${id}`,updateRegister);
    }

}