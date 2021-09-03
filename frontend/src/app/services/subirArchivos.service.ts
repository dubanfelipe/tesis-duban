import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})
export class subirArchivosService{

    constructor(private storage: AngularFireStorage){
    }
    subirArchivos(nombreArchivo, datos){
        return this.storage.upload(nombreArchivo, datos)
    }
    getUrlArchivo(nombreArchivo){
        return this.storage.ref(nombreArchivo)
    }
}