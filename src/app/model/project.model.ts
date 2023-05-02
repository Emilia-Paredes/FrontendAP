export class Project {
  id?: number;
  nombreProy: string;
  descripcionProy: string;
  imageProy: string;

  constructor(id: number, nombreProj: string, descripcionProj: string, imageProj: string) {
    this.nombreProy = nombreProj;
    this.descripcionProy = descripcionProj;
    this.imageProy = imageProj;
  }
}