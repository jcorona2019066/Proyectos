export class Torneo{
  constructor(
    public _id: String,
    public nombre: String,
    public equipos:[{
      equipoId: String,
    }],
    public iniciado: Boolean,
    public terminado: Boolean,
    public imagen: String,
    public idCategoria: String
  ){}
}
