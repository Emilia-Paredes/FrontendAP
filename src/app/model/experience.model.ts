export class Experience {
  id?: number;
  nombreExp: string;
  duracionExp: string;
  descripcionExp: string;
  imageExp: string;

  constructor(id: number, nombreExp: string, duracionExp: string, descripcionExp: string, imageExp: string) {
    this.id = id;
    this.nombreExp = nombreExp;
    this.duracionExp = duracionExp;
    this.descripcionExp = descripcionExp;
    this.imageExp = imageExp;
  }
}