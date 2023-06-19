export class Persona {
  id?: number;
  apellido: string;
  nombre: string;
  ocupacion: string;
  sobremi: string;
  url_imagen: string;

  constructor(id: number, nombre: string, apellido: string, ocupacion: string, sobremi: string, url_imagen: string) {
    this.id = id;
    this.apellido = apellido;
    this.nombre = nombre;
    this.ocupacion = ocupacion;
    this.sobremi = sobremi;
    this.url_imagen = url_imagen;
  }
}