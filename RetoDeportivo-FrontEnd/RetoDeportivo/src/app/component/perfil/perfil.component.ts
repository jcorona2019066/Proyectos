import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { SubirimagenService } from 'src/app/service/subirimagen.service';
import { Usuario } from 'src/app/model/usuario.model';
import { Router } from '@angular/router';
import { GLOBAL } from 'src/app/service/global.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  providers: [UsuarioService,SubirimagenService],
})
export class PerfilComponent implements OnInit {
  usuariosList;
  userActualizado;
  usuarioIDModel: Usuario;
  public identidad;
  public Identidad;
  public url;
  public token;

  constructor(
    public _usuarioService: UsuarioService, private _router: Router,
    private _subirService: SubirimagenService

    ) {
    this.Identidad = _usuarioService.obtenerIdentidad()
    this.usuarioIDModel = new Usuario('', '', '', '', 0,'', '', '', '');
    this.token = _usuarioService.obtenerToken()
    this.url = GLOBAL.url
  }

  ngOnInit(): void {}

  obtenerUsuarioId(id) {
    this._usuarioService.obtenerUserID(id).subscribe((response) => {
      this.usuarioIDModel = response.usuarioEncontrado;
      this.userActualizado = response.usuarioEncontrado;
      console.log(response.usuarioEncontrado);
    });
  }

  editarUser(id) {
    this._usuarioService.editarPerfil(this.usuarioIDModel, id).subscribe(
      (response) => {
        this.identidad = response.userActualizado;
        console.log(response);
        localStorage.setItem('identidad', JSON.stringify(this.identidad));
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  eliminarUser(id) {
    this._usuarioService.eliminarUser(id).subscribe(
      (response) => {
        console.log(response);
        this._router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Usuario Eliminado',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

  limpiarImagen(){
    this.usuarioIDModel.imagen = " "
  }

  subirImagen(){
    this._subirService.subirImagen(this.url + 'subirImagen', [], this.imagenASubir, this.token,
    'imagen').then((resultado: any) => {
      console.log(resultado);
      this.identidad.imagen = resultado.usuarioEncontrado.imagen;
      localStorage.setItem('identidad', JSON.stringify(this.identidad) );
    })

  }

  public imagenASubir: Array<File>;
  inputEvento(fileInput:any){
    this.imagenASubir = <Array<File>>fileInput.target.files;
  }

  cerrarSesion(){
    localStorage.clear()
  }

}
