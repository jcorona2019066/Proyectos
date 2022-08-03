import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/service/global.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  providers:[UsuarioService, CategoriaService],
})
export class InicioComponent implements OnInit {
  public identidad;
  public categorias;
  public url;
  constructor(
    public _usuarioService: UsuarioService,
    public _categoriaService: CategoriaService,
    private _router: Router
  ) {
    this.identidad = this._usuarioService.obtenerIdentidad()
    this.url = GLOBAL.url
  }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias(){
    this._categoriaService.obtenerCategoria().subscribe(
      response=>{
        this.categorias = response.categorias;
        console.table(response.categorias);
      }
    )
  }



}
