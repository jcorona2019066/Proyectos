import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';
import { GLOBAL } from 'src/app/service/global.service';
import { EquipoService } from 'src/app/service/equipo.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [UsuarioService, EquipoService]
})
export class UsuariosComponent implements OnInit {
  usuariosList;
  userActualizado;
  usuarioIDModel: Usuario;
  usuarios;
  equipo;
  public url;
  public identidad;
  constructor(public _usuarioService: UsuarioService, private _router: Router, public _equipoService: EquipoService) {
    this.usuarioIDModel = new Usuario('', '', '', '',0, '', '', '', '');
    this.url = GLOBAL.url
  }
  

  ngOnInit(): void {
    this.todosUsuarios();
  }

  editarUser(id) {
    this._usuarioService.editarPerfil(this.usuarioIDModel, id).subscribe(
      (response) => {
        console.log(response);
        this.ngOnInit()
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  obtenerUsuarioId(id) {
    this._usuarioService.obtenerUserID(id).subscribe((response) => {
      this.usuarioIDModel = response.usuarioEncontrado;
      this.userActualizado = response.usuarioEncontrado;
      console.log(response.usuarioEncontrado);
    });
  }

  eliminarUser(id) {
    this._usuarioService.eliminarUser(id).subscribe(
      (response) => {
        console.log(response);
        this.  ngOnInit()
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      },
      (error) => {
        console.log(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

  todosUsuarios(){
    this._usuarioService.obtenerUsuarios().subscribe(
      response=>{
        this.usuarios = response.Usuarios;
        console.table(this.usuarios);
      }
    )
  }

  todosEquipos(){
    this._equipoService.obtenerEquipo().subscribe(
      response => {
        this.equipo = response.EquipoEncontrado;
        console.table(this.equipo);
      }
    )
  }





}
