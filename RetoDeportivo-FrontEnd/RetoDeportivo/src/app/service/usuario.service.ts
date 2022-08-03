import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public ruta: String;
  public headersVariable = new HttpHeaders().set('Content-Type','application/json');
  public token;
  public identidad;
  constructor(public _http: HttpClient) {
    this.ruta = GLOBAL.url;
  }

  login(usuario, getToken = null):Observable<any>{
    if(getToken != null){
      usuario.getToken = getToken;
    }
    let params = JSON.stringify(usuario);
    return this._http.post(this.ruta + 'login', params,{headers: this.headersVariable})
  }

  registro(usuario:Usuario):Observable<any>{
    let params = JSON.stringify(usuario);
    return this._http.post(this.ruta + 'registrar', params,{headers: this.headersVariable})
  }

  obtenerIdentidad() {
    var identidad2 = JSON.parse(localStorage.getItem('identidad'));
    if (identidad2 != 'undefined') {
      this.identidad = identidad2;
    } else {
      this.identidad = null;
    }
    return this.identidad;
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

  editarPerfil(usuario:Usuario, id:String):Observable<any>{
    let params = JSON.stringify(usuario);
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.put(this.ruta + 'editarUsuario/'+ id, params, {headers: headersToken})
  }

  eliminarUser(id:String):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.delete(this.ruta + 'eliminarUsuario/' + id, {headers: headersToken})
  }

  obtenerUserID(id:String):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.get(this.ruta + 'obtenerUsuarioId/' + id, {headers: headersToken})
  }

  obtenerUsuarios():Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.get(this.ruta + '/todosUsuarios',{headers: headersToken})
  }



}
