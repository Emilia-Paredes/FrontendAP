export class Skill {
  id?: number;
  skill: string;
  percentage: number;

  constructor(id: number, skill: string, percentage: number) {
    this.id = id;
    this.skill = skill;
    this.percentage = percentage;
  }
}