import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class emailService{ 

    API_URL = 'http://3.94.158.166/api/email';
    constructor(private http: HttpClient) {}

    postFormulario(body) {
        return this.http.post(this.API_URL+`/formulario`, body);
    }
}