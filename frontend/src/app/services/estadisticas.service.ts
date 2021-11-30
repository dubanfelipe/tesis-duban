import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estadisticas } from '../models/Estadisticas';

@Injectable({
    providedIn: 'root'
})
export class EstadisticasService{ 

    API_URL = 'http://localhost:3000/api/estadisticas';
    constructor(private http: HttpClient) {}

    createEstadisticas(estadisticas : Estadisticas) {
        console.log("estadisticas", estadisticas);
        return this.http.post(this.API_URL+`/Grafica/createGrafica`, estadisticas);
    }
    getEstadisticas(diaLetra : string){
        console.log("diaLetra", diaLetra);
        return this.http.get(this.API_URL+`/Grafica/getGrafica/${diaLetra}`);
    }
    getEstadisticasMes(mes : string){
        console.log("mes", mes);
        return this.http.get(this.API_URL+`/Grafica/getGraficaMes/${mes}`);
    }
}