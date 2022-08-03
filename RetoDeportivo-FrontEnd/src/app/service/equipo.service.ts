import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipo } from '../model/equipo.model';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  public ruta:String
  public token
  public headersVariable = new HttpHeaders().set('Content-Type','application/json');

  constructor(
    public _http:HttpClient
  ) {
    this.ruta = GLOBAL.url
  }

  MostrarEquipoCategoria(id:String):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.get(this.ruta + "BuscarCategoria/" + id, {headers: headersToken})
  }


  obtenerEquipoID(id:String):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.get(this.ruta + "MostrarEquiposID/"+ id, {headers: headersToken})
  }

  obtenerEquipo():Observable<any>{
    return this._http.get(this.ruta + "MostrarEquipos/",{headers: this.headersVariable})
  }

  ObtenerTeam(id:String):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.get(this.ruta + "ObtenerTeam/"+ id, {headers: headersToken})
  }

  agregarEquipo(equipo:Equipo,id: string):Observable<any>{
    let params = JSON.stringify(equipo);
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.post(this.ruta + "CrearEquipo/"+id,params, {headers: headersToken})
  }

  agregarMiembro(modeloEquipo,id:String):Observable<any>{
    let params = JSON.stringify(modeloEquipo);
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.put(this.ruta + "AgregarMiembro/"+ id, params, {headers: headersToken})
  }


  eliminarMiembro(id:String):Observable<any>{

    return this._http.put(this.ruta + "EliminarMiembro/"+ id, {headers: this.headersVariable})
  }


  EditarEquipo(equipo:Equipo, id:String):Observable<any>{
    let params = JSON.stringify(equipo);
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.put(this.ruta + 'EditarEquipo/'+ id, params, {headers: headersToken})
  }

  obtenerUsuairo(): Observable<any>{
    return this._http.get(this.ruta + 'obtenerUsuario',{headers: this.headersVariable})
  }

  unirAEquipo(equipo: Equipo, id: String, idUsuario: String): Observable<any> {
    let params = JSON.stringify(equipo);
    return this._http.put(this.ruta + "unirAEquipo/" + id +'/'+ idUsuario, params,  { headers: this.headersVariable })
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
