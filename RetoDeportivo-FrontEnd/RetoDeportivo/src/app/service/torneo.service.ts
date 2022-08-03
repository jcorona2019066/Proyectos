import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Torneo } from '../model/torneo.model';
import { GLOBAL } from './global.service';
import { jornada } from "../model/jornada.model"


@Injectable({
  providedIn: 'root'
})
export class TorneoService {
  public ruta: String;
  public token;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) {
    this.ruta = GLOBAL.url
  }

  obtenerTorneos(id: string): Observable<any> {
    return this._http.get(this.ruta + 'torneosCategoria/' + id, { headers: this.headersVariable })
  }

  agregarTorneo(torneo: Torneo, categoriaId: String): Observable<any> {
    let params = JSON.stringify(torneo)
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.post(this.ruta + 'registrarTorneo/' + categoriaId, params, { headers: headersToken })
  }

  obtenerTorneo(idTorneo: String): Observable<any> {
    return this._http.get(this.ruta + 'torneoId/' + idTorneo, { headers: this.headersVariable })
  }

  editarTorneo(torneo: Torneo, idTorneo: String): Observable<any> {
    let params = JSON.stringify(torneo);
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.put(this.ruta + 'editarTorneo/' + idTorneo, params, { headers: headersToken })
  }

  eliminarTorneo(idTorneo: Torneo): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.delete(this.ruta + 'eliminarTorneo/' + idTorneo, { headers: headersToken })
  }

  equiposTorneo(idTorneo: Torneo): Observable<any> {
    return this._http.get(this.ruta + 'equiposTorneo/' + idTorneo, { headers: this.headersVariable })
  }

  equiposSinTorneo(idTorneo: Torneo): Observable<any> {
    return this._http.get(this.ruta + 'equiposSinTorneo/' + idTorneo, { headers: this.headersVariable })
  }

  unirMiEquipo(torneo: Torneo, idTorneo: String, idUsuario: String): Observable<any> {
    let params = JSON.stringify(torneo);
    return this._http.put(this.ruta + "unirMiEquipo/" + idTorneo +'/'+ idUsuario, params,  { headers: this.headersVariable })
  }

  unirEquipos(torneoModel, idTorneo: String) {
    let params = JSON.stringify(torneoModel);
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.post(this.ruta + 'unirEquipos/' + idTorneo, params, { headers: headersToken })
  }

  iniciarTorneo(idTorneo: Torneo): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.put(this.ruta + 'iniciarTorneo/' + idTorneo, { headers: headersToken })
  }

  campeon(idTorneo: Torneo): Observable<any> {
    return this._http.get(this.ruta + 'campeon/' + idTorneo, { headers: this.headersVariable })
  }

  obtenerUser(id:String):Observable<any>{
    return this._http.get(this.ruta + 'obtenerUsuario/' + id, {headers: this.headersVariable})
  }

  obtenerToken() {
    var token2 = localStorage.getItem('token');
    if (token2 != 'undefined') {
      this.token = token2;
    } else {
      this.token = null;
    }
    return this.token;
  }

  terminarTorneo(idTorneo: Torneo): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.put(this.ruta + 'terminarTorneo/' + idTorneo, { headers: headersToken })
  }

  buscarCampeon(id:String):Observable<any> {
    return this._http.get(this.ruta + 'BuscarCampeones/'+id,{ headers: this.headersVariable})
  }

//jornada

ingresarJornada(jornada: jornada, idLiga):Observable<any>{
  let params = JSON.stringify(jornada)
  let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
  return this._http.post(this.ruta + '/ingresarJornada/' + idLiga , params, {headers: headersToken})
}

}
