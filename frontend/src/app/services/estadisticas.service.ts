import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estadisticas } from '../models/Estadisticas';

@Injectable({
    providedIn: 'root'
})
export class EstadisticasService{ 

    API_URL = 'http://3.94.158.166/api/estadisticas';
    constructor(private http: HttpClient) {}

    createEstadisticas(estadisticas : Estadisticas) {
        return this.http.post(this.API_URL+`/Grafica/createGrafica`, estadisticas);
    }
    getEstadisticas(diaLetra : string){
        return this.http.get(this.API_URL+`/Grafica/getGrafica/${diaLetra}`);
    }
    getEstadisticasMes(mes : string){
        return this.http.get(this.API_URL+`/Grafica/getGraficaMes/${mes}`);
    }
}