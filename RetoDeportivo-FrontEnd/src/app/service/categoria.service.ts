import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Torneo } from '../model/torneo.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  public ruta: String;
  public token
  public headersVariable = new HttpHeaders().set('Content-Type','application/json');
  constructor(public _http: HttpClient) {
    this.ruta = GLOBAL.url;
  }

  obtenerCategoria(): Observable<any>{
    return this._http.get(this.ruta + "/todasCategorias",{headers: this.headersVariable})
  }

  obtenerCategoriaId(id): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.get(this.ruta+"/obtenerCategoriasId/"+id,{headers: headersToken})
  }

  obtenerToken(){
    var token2 = localStorage.getItem('token');
    if(token2 != 'undefined'){
      this.token = token2;
    }else{
      this.token = null;
    }
    return this.token;
  }

}


