export class Persona {
  id?: number;
  nombre: string;
  apellido: string;
  ocupacion: string;
  email: string;
  sobremi: string;
  urlImagen: string;

  constructor(id: number, nombre: string, apellido: string, ocupacion: string, email: string, sobremi: string, urlImagen: string) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.ocupacion = ocupacion;
    this.email = email;
    this.sobremi = sobremi;
    this.urlImagen = urlImagen;
  }
}

// export interface Persona {
//   id: number;
//   nombre: string;
//   apellido: string;
//   ocupacion: string;
//   email: string;
//   sobremi: string;
//   urlImagen: string;

// } 