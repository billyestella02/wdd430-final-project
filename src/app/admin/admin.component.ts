import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from '../projects/project.model';
import { ProjectService } from '../projects/project.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  project: Project;
  projects: Project[] = [];
  projectsSub!: Subscription;

  constructor(
    public projectService: ProjectService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projectService.getProjects();

    this.projectsSub = this.projectService.getProjectUpdateListener()
      .subscribe((projects: Project[]) => {
        this.projects = projects;
      });

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        this.project = this.projectService.getProject(id);
        console.log(this.project);
      }
    );
  }

  onDeleteProject() {
    console.log(this.project);
    this.projectService.deleteProject(this.project);
  }
}
