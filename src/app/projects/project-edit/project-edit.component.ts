import { Component, OnInit } from '@angular/core';
import { Project } from '../project.model';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../project.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  originalProject: Project;
  project: Project;
  editMode: boolean = false;

  constructor(public projectService: ProjectService,
              public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        if (!id) {
          this.editMode = false;
          return;
        }
        this.originalProject = this.projectService.getProject(id);

        if (!this.project) {
          return;
        }
        this.editMode = true;
        this.project = JSON.parse(JSON.stringify(this.originalProject));
      }
    );
  }

  onSubmit(form: NgForm) {
    let id = (this.projectService.getMaxId() + 1).toString();
    let value = form.value;
    let newProject = new Project(id, value.name, value.website, value.imageUrl);

    if (this.editMode) {
      this.projectService.updateProject(this.originalProject, this.project);
    } else {
      this.projectService.addProject(newProject);
    }
    form.resetForm();
  }
}
