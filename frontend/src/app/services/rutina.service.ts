import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EJERCICIO } from '../models/EJERCICIOS';
import { musculos } from '../models/musculo';
import { rutinas } from '../models/rutina';
import { has } from '../models/ejerciciohasrutina';
import { RutinaCompleta } from '../models/rutinaCompleta';
import { RutinaCompletahasPersona } from '../models/rutinaCompletaHasPersona';

@Injectable({
    providedIn: 'root'
})
export class rutinaService{
    idRutinaCompleta;
    ejercicios: EJERCICIO[];
    musculo: musculos[];
    rutina: RutinaCompleta[];
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
    getEjercicioById(id:number){
        return this.http.get(this.API_URL+`/Ejercicio/${id}`);
    }
    getMusculos(){
        return this.http.get(this.API_URL+"/Musculos");
    }
    createMusculos(musculos:musculos){
        return this.http.post(this.API_URL+'/Musculos/createMusculos',musculos);
    }
    createRutina(rutina:rutinas){
        return this.http.post(this.API_URL+'/Rutina/createRutina',rutina);
    }
    createEjercicioHasRutina(Has:has){
        console.log("este es el Has",Has);
        return this.http.post(this.API_URL+'/EjercicioHasRutina/create',Has);
    }
    deleteEjercicioHasRutina(Has:has){
        return this.http.delete(this.API_URL+`/EjercicioHasRutina/delete/${Has.Id_ejercicio}/${Has.Id_rutina}`);
    } 
    getEjercicioHasRutina(Id:number){
        return this.http.get(this.API_URL+`/EjercicioHasRutina/${Id}`);
    } 
    createRutinacompleta(rutina:RutinaCompleta){
        return this.http.post(this.API_URL+'/Rutinacompleta/create',rutina);
    }   
    getRutinacompleta(){
        return this.http.get(this.API_URL+'/Rutinacompleta/get');
    }
    getRutinacompletaById(Id:number){
        return this.http.get(this.API_URL+`/Rutinacompleta/getById/${Id}`);
    }
    createRutinacompletaHasPersona(Has:RutinaCompletahasPersona){
        return this.http.post(this.API_URL+'/RutinaCompletaHasPersona/create',Has);
    }
}
