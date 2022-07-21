export class Project {
  public id: string;
  public name: string;
  public website: string;
  public imageUrl: string;


  constructor(id: string, name: string, website: string, imageUrl: string) {
    this.id = id;
    this.name = name;
    this.website = website;
    this.imageUrl = imageUrl;
  }
}
