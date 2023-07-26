export class Task {
  constructor(
    public title: string,
    public description: string,
    public date: Date,
    public category: string,
    public isImportant: boolean,
    public isDone: boolean = false
  ) {}
}
