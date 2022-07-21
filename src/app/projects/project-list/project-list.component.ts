import { Component, OnInit } from '@angular/core';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = [];
  projectsSub!: Subscription;

  constructor(public projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getProjects();

    this.projectService.projectChangedEvent.subscribe(
      (projects: Project[]) => {
        this.projects = projects;
      }
    );

    this.projectsSub = this.projectService.getProjectUpdateListener()
      .subscribe((projects: Project[]) => {
        this.projects = projects;
      });
  }

  ngOnDestroy(): void {
    this.projectsSub.unsubscribe();
  }

}
