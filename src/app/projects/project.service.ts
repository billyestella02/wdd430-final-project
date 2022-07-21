import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Project } from "./project.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService implements OnInit {

  projectListChangedEvent = new EventEmitter<Project[]>();
  projectSelectedEvent = new EventEmitter<Project>();
  projectChangedEvent = new EventEmitter<Project[]>();

  projects: Project[] = [];
  project!: Project;
  maxId!: number;
  projectsUpdated = new Subject<Project[]>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

  }

  getProjects() {
    this.http.get<{ message: string, posts: Project[]}>
    ('http://localhost:3000/projects')
      .subscribe(
        (projectsData) => {
          this.projects = projectsData.posts;
          this.projectsUpdated.next([...this.projects]);
          this.maxId = this.getMaxId();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getProjectUpdateListener() {
    return this.projectsUpdated.asObservable();
  }

  getProject(id: string): Project | null {
    return this.projects.find((project) => project.id === id);
  }

  getMaxId(): number {
    return this.projects.length;
  }

  addProject(newProject: Project) {
    if (!newProject) {
      return;
    }
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post<{ message: string, project: Project }>(
      'http://localhost:3000/projects',
      newProject,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.projects.push(responseData.project);
        }
      );
  }

  updateProject(originalProject: Project, newProject: Project) {

  }

  deleteProject(project: Project) {
    if (!project) {
      return;
    }

    const pos = this.projects.findIndex(p => p.id === project.id);
    if (pos < 0) {
      return;
    }

     // delete from database
     this.http.delete('http://localhost:3000/projects/' + project.id)
      .subscribe(
        (response: Response) => {
          this.projects.splice(pos, 1);
        }
      );
  }
}
