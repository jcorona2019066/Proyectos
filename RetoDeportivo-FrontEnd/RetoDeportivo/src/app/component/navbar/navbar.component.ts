import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { GLOBAL } from 'src/app/service/global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers:[UsuarioService]
})
export class NavbarComponent implements OnInit {
  public identidad;
  public url;
  constructor(
    public _usuarioService: UsuarioService,
  ) {
   // this.identidad = this._usuarioService.obtenerIdentidad()
    this.url = GLOBAL.url
  }

  ngOnInit(): void {
  }

  cerrarSesion(){
    localStorage.clear()
  }

}
