import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EJERCICIO } from '../models/EJERCICIOS';

@Injectable({
    providedIn: 'root'
})
export class rutinaService{

    ejercicios: EJERCICIO[];
    API_URL = 'http://localhost:3000/api/rutina';
    constructor(private http: HttpClient) {}
    getEjercicio(){
        return this.http.get(this.API_URL+"/Ejercicio");
    }
    createEjercicio(ejercicio:EJERCICIO ){
        return this.http.post(this.API_URL+'/Ejercicio/createEjercicio',ejercicio);
    }
    updateEjercicio(id:number,ejercicio:EJERCICIO){
        return this.http.put(this.API_URL+`/Ejercicio/${id}`,ejercicio);
    }
    deleteEjercicio(id:number){
        return this.http.delete(this.API_URL+`/Ejercicio/${id}`);
    }
}
