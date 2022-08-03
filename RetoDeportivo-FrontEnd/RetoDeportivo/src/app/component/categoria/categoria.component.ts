import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/service/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { Equipo } from 'src/app/model/equipo.model';
import { EquipoService } from 'src/app/service/equipo.service';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/model/usuario.model';
import { Torneo } from 'src/app/model/torneo.model';
import { TorneoService } from 'src/app/service/torneo.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
  providers: [UsuarioService, CategoriaService, EquipoService, TorneoService]
})
export class CategoriaComponent implements OnInit {
  public identidad;
  public url;
  public idCategoria
  public categoriaList
  public ModelEquipoID: Equipo
  public equipoList
  public idEquipo
  public usuarioModel: Usuario;
  public token;
  public modelTorneo: Torneo;
  public torneoList;
  public nuevosDatos;
  public tipo;

  constructor(
    public _CategoriaService: CategoriaService,
    public _usuarioService: UsuarioService,
    private _router: Router,
    public _torneoService: TorneoService,
    public _activatedRoute: ActivatedRoute,
    public _EquipoService: EquipoService,
  ) {
    this.ModelEquipoID = new Equipo('', '', '', 0, 0, [{ torneo: '',nombreTorneo:'',imagenTorneo:'' }], [{ usuario: '' }], '')
    this.modelTorneo = new Torneo('', '', [{ equipoId: '' }], false, false, '', '');
    this.identidad = this._usuarioService.obtenerIdentidad()
    this.url = GLOBAL.url
    this.usuarioModel = new Usuario('', '', '', '', 0, '', '', '', '');

  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRoute) => {
      this.idCategoria = dataRoute.get('idCategoria')
    })
    this.ObtenerCategoriaID(this.idCategoria)
    this.MostrarEquipoCategoria(this.idCategoria)
    this.obtenerTorneoCategoria(this.idCategoria)
    this.obtenerIdentidad();
  }

  obtenerTorneoCategoria(id) {
    this._torneoService.obtenerTorneos(id).subscribe(
      response => {
        this.torneoList = response.torneoEncontrado
        var torn = response.torneoEncontrado
        console.table(torn)
      },
    )
  }

  ObtenerCategoriaID(id) {
    this._CategoriaService.obtenerCategoriaId(id).subscribe(
      response => {

        this.categoriaList = response.cateEncontrado
        console.table(response)
      },
      err => {
        console.log(<any>err)
      }
    )
  }

  MostrarEquipoCategoria(id) {
    this._EquipoService.MostrarEquipoCategoria(id).subscribe(
      response => {
        this.equipoList = response.EquipoEncontrado
        var team = response.EquipoEncontrado
        console.table(team)
      },
      err => {

      }
    )
  }

  mostarEquipoID(id) {
    this._EquipoService.obtenerEquipoID(id).subscribe(
      response => {

        this.idEquipo = response.EquipoEncontrado
        console.table(this.idEquipo)
      },
      err => {

      }
    )
  }

  crearTorneo() {
    this._torneoService.agregarTorneo(this.modelTorneo, this.idCategoria).subscribe(
      response => {
        console.table(response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Torneo Registrado',
          showConfirmButton: false,
          timer: 1500
        })
        this.modelTorneo.nombre = ''
        window.location.reload()
      },
      error => {
        console.log(<any>error)
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
        this.modelTorneo.nombre = ''
      }
    )
  }

  unirMiEquipo(idTorneo) {
    this._torneoService.unirMiEquipo(this.modelTorneo, idTorneo, this._usuarioService.obtenerIdentidad()._id,).subscribe(
      response => {
        console.table(response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Bienvenido al torneo',
          showConfirmButton: false,
          timer: 1500
        })
          this.obtenerIdentidad();
          this.navegarTorneos(idTorneo);
      },
      error => {
        console.log(<any>error)
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  CrearEquipo() {
    this._EquipoService.agregarEquipo(this.ModelEquipoID, this.idCategoria).subscribe(
      response => {
        console.table(response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Equipo Creado',
          showConfirmButton: false,
          timer: 1500
        })
        this.ModelEquipoID.nombre = ''
        this.MostrarEquipoCategoria(this.idCategoria)
        this.obtenerUsuario();
        window.location.reload();
      },
      error => {
        console.log(<any>error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
        this.ModelEquipoID.nombre = ''
      }
    )
  }

  navegarTorneos(idTorneo) {
    this._router.navigate(['Torneo', idTorneo])
  }

  obtenerUsuario() {
    this._usuarioService.obtenerUserID(this._usuarioService.obtenerIdentidad()._id).subscribe(
      response => {
        this.nuevosDatos = response.usuarioEncontrado;
        localStorage.setItem('identidad', JSON.stringify(this.nuevosDatos))
      }
    )
  }

  obtenerIdentidad(){
    this._torneoService.obtenerUser(this._usuarioService.obtenerIdentidad()._id).subscribe(
      response =>{
        this.tipo = response.usuarioEncontrado;
      }
    )
  }
}
